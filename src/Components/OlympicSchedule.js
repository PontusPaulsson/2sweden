import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { scheduleData } from '../Data/OlympicScheduleData'
import goldMedalMen from '../img/gold-medal2.png'
import goldMedalWomen from '../img/gold-medal.png'
import femaleSymbol from '../img/woman.png'
import maleSymbol from '../img/male.png'
import genderSymbol from '../img/genders.png'
import goldMedals from '../img/gold-medal3.png'

function test() {
    return <div><img height={34} src={maleSymbol} /></div>
}



class OlympicSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    generateSymbol(row) {
        if (row.row.day1 === 'X') {
            return <div><img height={34} src={maleSymbol} /></div>
        } else if (row.row.day1 === 'O') {
            return <div><img height={34} src={femaleSymbol} /></div>
        } else if (row.row.day1 === 'M') {
            return <div><img height={34} src={goldMedals} /></div>
        } else if (row.row.day1 === 'MM') {
            return <div><img height={34} src={goldMedalMen} /></div>
        } else if (row.row.day1 === 'FM') {
            return <div><img height={34} src={goldMedalWomen} /></div>
        } else if (row.row.day1 === 'XO') {
            return <div><img height={34} src={genderSymbol} /></div>
        } else {
            return ''
        }
    }

    render() {
        const columns = [{
            Header: 'Sport',
            accessor: 'sport'
        }, {
            Header: '7th Mon',
            accessor: 'day1',
            Cell: (row) => {
                test()
            }
        }, {
            Header: '8th Mon',
            accessor: 'day2'
        }, {
            Header: '9th Mon',
            accessor: 'day3'
        },
        {
            Header: '10th Mon',
            accessor: 'day4'
        }, {
            Header: '11th Mon',
            accessor: 'day5'
        }
        ]

        return (
            <div>
                <ReactTable data={scheduleData} className='result-table'
                    columns={columns}
                    showPagination={false}
                    defaultPageSize={5} />
            </div>
        )
    }
}


export default OlympicSchedule