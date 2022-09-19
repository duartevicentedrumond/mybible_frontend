import React, { useContext, useEffect } from 'react';

import CategorySumContext from "../../context/Wallet/CategorySum/CategorySumContext";
import DebtSumContext from "../../context/Wallet/DebtSum/DebtSumContext";
import { Styled__Title } from "../../design/style";

const TransactionInfo = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {categoriesSum, getCategoriesSum} = useContext(CategorySumContext);
    const {debtsSum, getDebtsSum} = useContext(DebtSumContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getCategoriesSum();
            getDebtsSum();
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

            <Styled__Title.InfoTitle className='pb-0 d-flex justify-content-between'>
                <span>Total</span> 
                <span>
                    {
                        (categoriesSum.reduce((a, c) => { return a + c.sum}, 0)).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })
                    }€
                </span>
            </Styled__Title.InfoTitle>
            {categoriesSum.map( (category) => {

                if (category.active) {
                    return(
                        <Styled__Title.InfoItem className='pb-0 d-flex justify-content-between' key={category.category}>
                            <span>{category.category}</span>
                            <span>{(category.sum).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })} €</span>
                        </Styled__Title.InfoItem>
                    );
                }
            })}

            {debtsSum.find((debt) => debt.debt > 0) ?
                <div>
                    <Styled__Title.InfoTitle className='pt-3 d-flex justify-content-between'>
                        <span>Debt</span> 
                        <span>
                            {
                                (debtsSum.reduce((a, c) => { 
                                    return c.debt > 0 ? a + c.debt : a
                                }, 0)).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })
                            }€
                        </span>
                    </Styled__Title.InfoTitle>
                    {debtsSum.map( (debt) => {
                        return debt.debt > 0 ?
                            
                            <Styled__Title.InfoItem className='pb-0 d-flex justify-content-between' key={debt.person_id}>
                                <span>{debt.nickname}</span>
                                <span>{(debt.debt).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })} €</span>
                            </Styled__Title.InfoItem>
                        :
                        <span></span>
                    })}
                </div>
            : <div></div> }

            {debtsSum.find((debt) => debt.debt < 0) ?
                <div>
                    <Styled__Title.InfoTitle className='pt-3 d-flex justify-content-between'>
                        <span>Credit</span> 
                        <span>
                            {
                                (debtsSum.reduce((a, c) => { 
                                    return c.debt < 0 ? a + c.debt : a
                                }, 0)).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })
                            }€
                        </span>
                    </Styled__Title.InfoTitle>
                    {debtsSum.map( (debt) => {
                        return debt.debt < 0 ?
                            
                            <Styled__Title.InfoItem className='pb-0 d-flex justify-content-between' key={debt.person_id}>
                                <span>{debt.nickname}</span>
                                <span>{(debt.debt).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })} €</span>
                            </Styled__Title.InfoItem>
                        :
                        <span></span>
                    })}
                </div>
            : <div></div> }

        </div>
    )
}

export default TransactionInfo;