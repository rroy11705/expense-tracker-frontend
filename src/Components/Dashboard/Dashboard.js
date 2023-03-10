import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled totalBalance={totalBalance()}>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats">
                    <div className="amount">
                        <div className='details'>
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    ₹ {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    ₹ {totalExpenses()}
                                </p>
                            </div>
                        </div>
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p>
                                {totalBalance() < 0 ? `- ₹ ${Math.abs(totalBalance())}` : `₹ ${totalBalance()}`}
                            </p>
                        </div>
                    </div>
                    <div className="history">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        @media (max-width: 576px) {
            flex-direction: column;
        }
        .amount {
            width: 60%;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-top: 2rem;
            @media (max-width: 576px) {
                width: 100%;
            }
            .details {
                display: flex;
                flex-direction: row;
                gap: 2rem;
                @media (max-width: 576px) {
                    flex-direction: column;
                }
            }
            .income, .expense, .balance {
                background: #000000;
                border-radius: 20px;
                padding: 1rem;
                p{
                    font-size: 2.5rem;
                    font-weight: 700;
                }
            }
            .income {
                width: 50%;
                color: var(--color-green);
                @media (max-width: 576px) {
                    width: 100%;
                }
            }
            .expense {
                width: 50%;
                color: var(--color-red);
                @media (max-width: 576px) {
                    width: 100%;
                }
            }

            .balance{
                width: 100%;
                grid-column: 2 / 4;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: start;
                p{
                    color: ${props => props.totalBalance < 0 ? 'var(--color-red)' : 'var(--color-green)'};
                    font-size: 2.5rem;
                }
            }
        }

        .history{
            flex-grow: 1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard