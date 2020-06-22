import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { fetchMediaRequestStats } from "./api/wikipedia";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface FormValues {
  filePath: string;
  start: Date;
  end: Date;
}

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

function App() {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: getFormValuesFromLocalStorage(),
  });
  const [stats, setStats] = useState<
    Array<{ name: string; requests: number }>
  >();
  const onSubmit = async (values: FormValues) => {
    localStorage.setItem("formValues", JSON.stringify(values));
    const { ok, data } = await fetchMediaRequestStats(values);
    if (ok) {
      setStats(
        data.items.map((item) => {
          return {
            name: item.timestamp,
            requests: item.requests,
          };
        })
      );
    } else {
      alert(data);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Wikimedia GLAM Dashboard</h1>
      <form className="form-inline mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mr-2">
          <label htmlFor="filePath">File path</label>
          <input
            className="form-control"
            type="text"
            name="filePath"
            id="filePath"
            ref={register({ required: true })}
          />
        </div>
        <div className="form-group mr-2">
          <label htmlFor="startDate">From</label>
          <Controller
            className="form-control"
            as={DatePicker}
            control={control}
            valueName="selected"
            onChange={([selected]) => selected}
            name="start"
            placeholderText="Select date"
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">To</label>
          <Controller
            className="form-control"
            as={DatePicker}
            control={control}
            valueName="selected"
            onChange={([selected]) => selected}
            name="end"
            placeholderText="Select date"
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div className="col">
          <input type="submit" className="btn btn-primary" value="Get" />
        </div>
      </form>
      {stats && (
        <AreaChart
          width={500}
          height={400}
          data={stats}
          margin={{
            top: 10,
            right: 30,
            left: 60,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      )}
    </div>
  );
}

export default App;
