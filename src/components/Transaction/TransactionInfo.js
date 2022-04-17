import React, { useContext, useEffect } from 'react';

import CategorySumContext from "../../context/Wallet/CategorySum/CategorySumContext";
import { Styled__Title } from "../../design/style";

const TransactionInfo = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {categoriesSum, getCategoriesSum} = useContext(CategorySumContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getCategoriesSum();
        }
    , []);

    return (
        <div className="flex">

            {/*
                Render a table with the following features:
                    - table-hover: highlight the table's row when hovered
                    - table-sm: reduce row vertical spacing
                    - w-auto: auto columns' width

                    <th>
                        - text-end: horizontal align text to right
                        - text-start: horizontal align text to left
                        - px-4: column horizontal padding (left and right) with 4
            */}

            <Styled__Title.InfoTitle>
                Info
            </Styled__Title.InfoTitle>
            {categoriesSum.map( (category) => (
                <Styled__Title.InfoItem className='pb-0'>- {category.category}: {parseFloat(category.sum).toFixed(2)}€</Styled__Title.InfoItem>
            ))}

        </div>
    )
}

export default TransactionInfo;