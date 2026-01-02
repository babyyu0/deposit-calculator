import { useState } from 'react'
import '../styles/Savings.css'

function Saving() {
  // input
  const [payment, setPayment] = useState(0)
  const [isMonths, setIsMonths] = useState(true)
  const [months, setMonths] = useState(Number(0))
  const [days, setDays] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [taxType, setTaxType] = useState(15.4)

  // Result
  const [totalPrincipal, setTotalPrincipal] = useState(0)
  const [pretaxInterest, setPretexInterest] = useState(0)
  const [interestTax, setInterestTax] = useState(0)
  const [resultHidden, setResultHidden] = useState(true)


  const calculate = async() => {
    setResultHidden(false)
    let curTotalPrincipal = 0
    let curPretaxInterest = 0
    let curInterestTex = 0

    if(isMonths) {
      // 월 적립의 경우
      curTotalPrincipal = payment * months
      curPretaxInterest = payment * (months * (months + 1) / 2) * (interestRate* 0.01 / 12)
      curInterestTex = curPretaxInterest * taxType * 0.01
    } else {
      // 일 적립의 경우
      curTotalPrincipal = payment * days
      curPretaxInterest = payment * (days * (days + 1) / 2) * (interestRate* 0.01 / 365)
      curInterestTex = curPretaxInterest * taxType * 0.01
    }

    curTotalPrincipal = Math.round(curTotalPrincipal)
    curPretaxInterest = Math.round(curPretaxInterest)
    curInterestTex = Math.round(curInterestTex)

    setTotalPrincipal(curTotalPrincipal)
    setPretexInterest(curPretaxInterest)
    setInterestTax(curInterestTex)
  }

  return (
    <div className='savings-container d-flex justify-content-center align-items-center'>
      <div className='savings-frame text-center'>
        <h2 className='title'>💰 적금 이자 계산기</h2>
        <div className='input-frame'>
          <div className='text-start'>
            <label className='input-text'>{isMonths ? "월" : "일"} 납입액</label>
            <div className='input-group'>
              <input type='number' className='form-control' value={payment} onChange={(e) => { setPayment(e.target.value) }} />
              <span className="input-group-text">원</span>
            </div>
          </div>
          <div className="btn-group" hidden={!isMonths}>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(0) }}>C</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 100000) }}>+10만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 300000) }}>+30만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 500000) }}>+50만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 1000000) }}>+100만</button>
          </div>
          <div className="btn-group" hidden={isMonths}>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(0) }}>C</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 10000) }}>+1만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 30000) }}>+3만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 50000) }}>+5만</button>
            <button type="button" className="btn btn-light" onClick={() => { setPayment(payment + 100000) }}>+10만</button>
          </div>
        </div>
        <div className='input-frame'>
          <div className='text-start'>
            <label className='input-text'>적립 기간 (
              <input type="radio" className="form-check-input month-check" checked={isMonths} onChange={(e) => { setIsMonths(e.target.value) }} /> 개월
              <input type="radio" className="form-check-input month-check" checked={!isMonths} onChange={(e) => { setIsMonths(!e.target.value) }} /> 일
              )</label>
            <div className='input-group'>
              <input type='number' className='form-control'
                value={isMonths ? months : days}
                onChange={(e) => {
                  if (isMonths) setMonths(e.target.value);
                  else setDays(e.target.value)
                }} />
              <span className="input-group-text">{isMonths ? "월" : "일"}</span>
            </div>
          </div>
          <div className="btn-group" hidden={!isMonths}>
            <button type="button" className="btn btn-light" onClick={() => { setMonths(0) }}>C</button>
            <button type="button" className="btn btn-light" onClick={() => { setMonths(6) }}>6개월</button>
            <button type="button" className="btn btn-light" onClick={() => { setMonths(12) }}>12개월</button>
            <button type="button" className="btn btn-light" onClick={() => { setMonths(24) }}>24개월</button>
          </div>
          <div className="btn-group" hidden={isMonths}>
            <button type="button" className="btn btn-light" onClick={() => { setDays(0) }}>C</button>
            <button type="button" className="btn btn-light" onClick={() => { setDays(30) }}>30일</button>
            <button type="button" className="btn btn-light" onClick={() => { setDays(100) }}>100일</button>
            <button type="button" className="btn btn-light" onClick={() => { setDays(365) }}>365일</button>
          </div>
        </div>
        <div className='input-frame'>
          <div className='text-start'>
            <label className='input-text'>연이자율</label>
            <div className='input-group'>
              <input type='number' className='form-control' value={interestRate} onChange={(e) => { setInterestRate(e.target.value) }} />
              <span className="input-group-text">%</span>
            </div>
          </div>
        </div>
        <div className='input-frame'>
          <div className='text-start'>
            <label className='input-text'>이자 과세</label>
            <select className="form-select" value={taxType} onChange={(e) => { setTaxType(e.target.value) }}>
              <option value="15.4">일반과세 (15.4%)</option>
              <option value="1.4">세금우대 (1.4%)</option>
              <option value="0">비과세 (0%)</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn btn-calculate btn-primary" onClick={calculate}>계산하기</button>
        <div className='result-frame' hidden={resultHidden}>
          <div className='d-flex justify-content-between'>
            <p>원금합계</p>
            <p>{totalPrincipal.toLocaleString()}원</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>세전이자</p>
            <p>{pretaxInterest.toLocaleString()}원</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>이자과세 ({taxType}%)</p>
            <p>- {interestTax.toLocaleString()}원</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>세후 수령액</p>
            <p>{(totalPrincipal + pretaxInterest - interestTax).toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Saving
