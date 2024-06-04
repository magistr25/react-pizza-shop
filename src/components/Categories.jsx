import React, {useState} from 'react';

const Categories = React.memo ( function Categories({items, onClickItem}){
    const [activeItem, setActiveItem] = useState(null);
    const onSelectItem = (index) =>{
        setActiveItem(index);
        onClickItem(index)
        console.log(index)
    }
    return (
        <div className="categories">
            <ul>
                <li className={activeItem===null? 'active': ''}
                             onClick={()=>onSelectItem(null)}>Все</li>
                {items &&
                    items.map((categoryName, index) => (
                <li  className={activeItem===index? 'active': ''}
                     onClick={()=>onSelectItem(index)}
                     key={`${categoryName}_${index}`}>{categoryName}
                </li>
                ))}

            </ul>
            </div>

    )
}
)

export default Categories;
