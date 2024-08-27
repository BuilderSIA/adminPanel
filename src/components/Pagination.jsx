/* eslint-disable react/prop-types */


const Pagination = ({itemPerPage,totalItems,paginate}) => {

    const pageNumbers = [];

    

    for(let i = 1; i<= Math.ceil(totalItems/itemPerPage);i++){
        pageNumbers.push(i)
    }


  return (
    <nav>
        <ul className="pagination">
            {
                pageNumbers.map(number=>(
                    <li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} style={{cursor:"pointer"}} className="page-link">
                            {number}
                        </a>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Pagination
