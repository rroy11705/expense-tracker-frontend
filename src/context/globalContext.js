import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:8000/api";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await fetch(`${BASE_URL}/income`, {
            body: JSON.stringify(income), 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await fetch(`${BASE_URL}/income`, {
            method: 'GET',
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        setIncomes(res.data)
    }

    const deleteIncome = async (id) => {
        const response = await fetch(`${BASE_URL}/income/${id}`, {
            method: 'DELETE',
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (expense) => {
        const response = await fetch(`${BASE_URL}/expense`, {
            body: JSON.stringify(expense), 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await fetch(`${BASE_URL}/expense`, {
            method: 'GET',
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        setExpenses(res.data)
    }

    const deleteExpense = async (id) => {
        const response = await fetch(`${BASE_URL}/expense/${id}`, {
            method: 'DELETE',
        })
        const res = await response.json();
        if(!response.ok) {
            setError(res.message)
        }
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}