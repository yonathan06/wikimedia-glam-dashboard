import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { fetchMediaRequestStats, DateFormat } from "../api/wikipedia";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import parseToDate from "date-fns/parse";
import formatDate from "date-fns/format";

interface FormValues {
  filePath: string;
  start: Date;
  end: Date;
}

const MonthDateFormat = "MMM yy";

function getFormValuesFromLocalStorage() {
  const valuesString = localStorage.getItem("formValues");
  if (!valuesString) {
    return {};
  }
  try {
    const values = JSON.parse(valuesString);
    return {
      ...values,
      start: new Date(values.start),
      end: new Date(values.end),
    };
  } catch (error) {
    return {};
  }
}

function General() {
  const { register, handleSubmit, control, formState } = useForm<FormValues>({
    defaultValues: getFormValuesFromLocalStorage(),
  });
  const [stats, setStats] = useState<
    Array<{ name: string; requests: number }>
  >();
  const [filePath, setFilePath] = useState("");
  const onSubmit = async (values: FormValues) => {
    localStorage.setItem("formValues", JSON.stringify(values));
    const { error, data } = await fetchMediaRequestStats(values);
    if (error) {
      alert(error.detail);
      return;
    }
    setFilePath(values.filePath);
    setStats(
      data?.items?.map((item) => {
        const date = parseToDate(item.timestamp, DateFormat, new Date());
        return {
          name: formatDate(date, MonthDateFormat),
          requests: item.requests,
        };
      })
    );
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Wikimedia GLAM Dashboard</h1>
      <form className="form-inline mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mr-2">
          <label className="sr-only" htmlFor="filePath">
            File path
          </label>
          <input
            className="form-control"
            type="text"
            name="filePath"
            id="filePath"
            ref={register({ required: true })}
          />
        </div>
        <div className="form-group mr-2">
          <label className="sr-only" htmlFor="startDate">
            From
          </label>
          <Controller
            className="form-control"
            as={DatePicker}
            control={control}
            valueName="selected"
            onChange={([selected]) => selected}
            name="start"
            placeholderText="Start month"
            dateFormat={MonthDateFormat}
            showMonthYearPicker
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="endDate">
            To
          </label>
          <Controller
            className="form-control"
            as={DatePicker}
            control={control}
            valueName="selected"
            onChange={([selected]) => selected}
            name="end"
            placeholderText="End month"
            dateFormat={MonthDateFormat}
            showMonthYearPicker
          />
        </div>
        <div className="col">
          <input
            type="submit"
            className="btn btn-primary"
            disabled={formState.isSubmitting}
            value="Get"
          />
        </div>
      </form>
      {stats && (
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid"
              src={`https://upload.wikimedia.org/${filePath}`}
              alt={filePath}
            />
          </div>
          <div className="col-md-6">
            <h3>Views/Month</h3>
            <AreaChart
              width={500}
              height={400}
              data={stats}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#17a2b8"
                fill="#17a2b8"
              />
            </AreaChart>
          </div>
        </div>
      )}
    </div>
  );
}

export default General;
