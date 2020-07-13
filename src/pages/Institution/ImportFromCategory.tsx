import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useGlamMediaItems } from '../../api/hook';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useInfiniteQuery } from 'react-query';
import { CategoryFileMembersResponse } from '../../api/wikipedia';
import { makeStyles } from '@material-ui/core';
import { fetchFileListByCategory } from '../../api/app';
import CategoryItemPreview from './components/CategoryItemPreview';

const useStyles = makeStyles((theme) => ({
  inlineForm: {
    display: 'flex',
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

export const AddFromCategory = () => {
  const { params } = useRouteMatch<{ glamId: string }>();
  const { data: existingItems } = useGlamMediaItems(params.glamId);
  const [category, setCategory] = React.useState('');
  const classes = useStyles();
  const { register, handleSubmit } = useForm<{ category: string }>();

  const onSubmit = (data: { category: string }) => {
    setCategory(data.category);
  };
  const {
    data: categoryItems,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery<
    CategoryFileMembersResponse,
    [string, string],
    string,
    Error
  >(
    ['categoryItems', category],
    (_, category: string, next?: string) => {
      return fetchFileListByCategory(category, next);
    },
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup?.continue?.cmcontinue,
      enabled: category,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div>
      <form className={classes.inlineForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={classes.searchInput}
          autoFocus
          id='category'
          name='category'
          label='Category name'
          variant='outlined'
          type='text'
          fullWidth
          required
          inputRef={register}
          disabled={isFetching || !!isFetchingMore}
        />
        <Button
          color='primary'
          variant='contained'
          type='submit'
          disabled={isFetching || !!isFetchingMore}
        >
          Search
        </Button>
      </form>
      <div>
        {categoryItems?.map((batch, index) => (
          <div key={index}>
            {batch?.query?.categorymembers?.map((categoryItem) => (
              <CategoryItemPreview
                key={categoryItem.title}
                categoryItem={categoryItem}
                existingItems={existingItems}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        {canFetchMore && (
          <Button
            color='primary'
            disabled={!!isFetchingMore}
            onClick={() => fetchMore()}
          >
            Load more
          </Button>
        )}
        {(isFetching || isFetchingMore) && <span>Loading...</span>}
      </div>
    </div>
  );
};
