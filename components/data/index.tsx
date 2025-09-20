"use client"
import { memo, useState, useEffect, } from "react"
import { TextInput, DateInput, Select } from "@/components/form"
import HistoricalPriceChart from "./HistoricalPriceChart"
import useIndexCompanies from "@/state/hooks/useIndexCompanies"
import clsx from "clsx"

interface DataProps {
}

export default memo(({ }: DataProps) => {
  const [type, setType] = useState<string>("historical")
  const [ticker, setTicker] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getTime()-1000*3600*24*365*5))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const companies = useIndexCompanies("^GSPC") || []

  const cls = {
    page: [
      "grid grid-cols-1 auto-rows-auto",
      "sm:grid-cols-[1fr_2fr]",
      "xl:grid-cols-[1fr_3fr]",
      "w-full h-full",
      "max-w-[calc(100vw-50px)] max-h-screen",
      "sm:max-w-screen sm:max-h-[calc(100vh-44px)]",
      "overflow-hidden",
      "gap-[1px]",
    ],
    controls: [
      "col-start-1",
      "flex flex-col gap-1",
      "bg-background",
      "py-1 px-1",
    ],
    typeSelect: [

    ],
    textInput: [

    ],
    dateInput: [

    ],
    chart: [
      "col-start-1",
      "sm:col-start-2",
      "xl:col-start-2",
      "bg-background",
    ],
  }

  useEffect(() => {
    if (ticker.length === 0 && companies.length > 0) {
      setTicker(companies[0].symbol)
    }
  }, [companies])

  return (
    <div className={clsx(cls.page)}>
      <div className={clsx(cls.controls)}>
        <Select className={clsx(cls.typeSelect)} 
          label="Chart Type"
          name="type"
          defaultValue={type} 
          onChange={e => setType(e.target.value)}>
          <option value="historical">Historical Prices</option>
          <option value="details">Details</option>
        </Select>
        <TextInput className={clsx(cls.textInput)}
          label="Ticker"
          name="symbol"
          placeholder=""
          list="companies-list"
          defaultValue={ticker} />
        <DateInput className={clsx(cls.dateInput)}
          label="Start Date"
          name="start_date"
          placeholder=""
          onChange={e => setStartDate(new Date(e.target.value))}
          defaultValue={startDate.toISOString().split("T")[0]} />
        <DateInput className={clsx(cls.dateInput)}
          label="End Date"
          name="end_date"
          placeholder=""
          onChange={e => setEndDate(new Date(e.target.value))}
          defaultValue={endDate.toISOString().split("T")[0]} />
      </div>
      <div className={clsx(cls.chart)}>
        {type === "historical" && 
        <HistoricalPriceChart 
          symbol={ticker}
          startDate={startDate}
          endDate={endDate} />}
      </div>
      <datalist id="companies-list">{companies.map(({ symbol, name }) => <option key={symbol} value={symbol} label={`${symbol} - ${name}`} />)}</datalist>
    </div>
  )
})