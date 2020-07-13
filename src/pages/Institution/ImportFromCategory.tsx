import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useGlamMediaItems } from '../../api/hook';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useInfiniteQuery } from 'react-query';
import { makeStyles } from '@material-ui/core';
import {
  fetchFileListByCategory,
  CategoryFileMembersResponse,
} from '../../api/app';
import CategoryItemPreview from './components/CategoryItemPreview';
import { useViewportSpy } from 'beautiful-react-hooks';

const useStyles = makeStyles((theme) => ({
  inlineForm: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const FetchMoreButton = ({
  onFetchMore,
  disabled,
}: {
  onFetchMore: () => void;
  disabled: boolean;
}) => {
  const ref = React.useRef<any>();
  const isLoadMoreButtonVisible = useViewportSpy(ref);
  React.useEffect(() => {
    if (isLoadMoreButtonVisible) {
      onFetchMore();
    }
  }, [isLoadMoreButtonVisible, onFetchMore]);
  return (
    <Button
      buttonRef={ref}
      color='primary'
      disabled={disabled}
      onClick={() => onFetchMore()}
    >
      Load more
    </Button>
  );
};

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
      getFetchMore: (lastGroup) => (lastGroup?.next ? lastGroup.next : false),
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
            {batch?.items?.map((categoryItem) => (
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
          <FetchMoreButton
            disabled={!!canFetchMore}
            onFetchMore={() => fetchMore()}
          />
        )}
        {(isFetching || isFetchingMore) && <span>Loading...</span>}
      </div>
    </div>
  );
};
