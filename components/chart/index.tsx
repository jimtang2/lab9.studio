"use client"
import { memo, useState, useEffect, } from "react"
import { TextInput, DateInput, Select } from "@/components/form"
import HistoricalPriceChart from "./HistoricalPriceChart"
import HistoricalPriceChartWebGL from "./HistoricalPriceChartWebGL"
import useIndexCompanies from "@/state/hooks/useIndexCompanies"
import clsx from "clsx"

interface ChartsProps {
}

export default memo(({ }: ChartsProps) => {
  const [type, setType] = useState<string>("historical-webgl")
  const [ticker, setTicker] = useState<string>("")
  const [tickerInput, setTickerInput] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getTime()-1000*3600*24*365*5))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const companies = useIndexCompanies("^GSPC") || []
  const companiesIndex: Record<string,number> = {}
  companies.map(({symbol,}, i) => companiesIndex[symbol] = i)

  const cls = {
    page: [
      "flex flex-col",
      "w-full h-full",
      "max-w-[calc(100vw-44px)] max-h-screen",
      "sm:max-w-screen sm:max-h-[calc(100vh-44px)]",
      "overflow-hidden",
      "gap-[1px]",
      "sm:border-t-1 border-border",
    ],
    controls: [
      "flex flex-row flex-wrap sm:flex-nowrap gap-[2px] sm:gap-[4px]",
      "justify-evenly sm:justify-center",
      "px-1",
    ],
    control: [
      "w-[49%] ",
      "sm:w-[24%] sm:max-w-60",
    ],
    select: [
    ],
    textInput: [

    ],
    dateInput: [

    ],
    chart: [
      "flex-grow-1 w-full",
      "bg-background",
    ],
  }

  useEffect(() => {
    if (ticker.length === 0 && companies.length > 0) {
      setTicker(companies[0].symbol)
    }
  }, [companies])

  useEffect(() => {
    if (tickerInput in companiesIndex) {
      setTicker(tickerInput)
    }
  }, [tickerInput])

  return (
    <div className={clsx(cls.page)}>
      <div className={clsx(cls.controls)}>
        <Select className={clsx([cls.select, cls.control])} 
          label="Chart Type"
          name="type"
          defaultValue={type} 
          onChange={e => setType(e.target.value)}>
          <option value="historical">Historical Prices</option>
          <option value="historical-webgl">Historical Prices (WebGL)</option>
          <option value="details">Details</option>
        </Select>
        <TextInput className={clsx([cls.textInput, cls.control])}
          label="Ticker"
          name="symbol"
          placeholder=""
          list="companies-list"
          defaultValue={ticker}
          onChange={e => setTickerInput(e.target.value)} />
        <DateInput className={clsx([cls.dateInput, cls.control])}
          label="Start Date"
          name="start_date"
          placeholder=""
          onChange={e => setStartDate(new Date(e.target.value))}
          defaultValue={startDate.toISOString().split("T")[0]} />
        <DateInput className={clsx([cls.dateInput, cls.control])}
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
        {type === "historical-webgl" && 
        <HistoricalPriceChartWebGL 
          symbol={ticker}
          startDate={startDate}
          endDate={endDate} />}
      </div>
      <datalist id="companies-list">{companies.map(({ symbol, name }) => <option key={symbol} value={symbol} label={`${symbol} - ${name}`} />)}</datalist>
    </div>
  )
})