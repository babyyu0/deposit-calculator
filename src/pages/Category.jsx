import '../styles/Category.css'

function Category({setSelected}) {
  return (
    <div className='category-container d-flex justify-content-center'>
      <button type="button" class="btn btn-dark" onClick={() => {setSelected("savings")}}>적금</button>
      <button type="button" class="btn btn-dark" onClick={() => {setSelected("deposit")}}>예금</button>
    </div>
  )
}

export default Category
