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
import alpine from '../img/alpine.png'
import hockey from '../img/hockey.png'
import figure from '../img/figure.png'
import skiJump from '../img/ski.png'
import snowboard from '../img/riding.png'
import speedskate from '../img/speed.png'
import curling from '../img/curling.png'
import freestyle from '../img/freestyle.png'
import biathlon from '../img/biathlon.png'
import torch from '../img/torch.png'

class OlympicSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    generateSport(sport) {
        if (sport === 'Alpine Skiing') {
            return <div><img height={34} src={alpine} /></div>
        } else if (sport === 'Ice Hockey') {
            return <div><img height={34} src={hockey} /></div>
        } else if (sport === 'Figure Skating') {
            return <div><img height={34} src={figure} /></div>
        } else if (sport === 'Ski Jumping') {
            return <div><img height={34} src={skiJump} /></div>
        } else if (sport === 'Snowboard') {
            return <div><img height={34} src={snowboard} /></div>
        } else if (sport === 'Curling') {
            return <div><img height={34} src={curling} /></div>
        } else if (sport === 'Speed Skating') {
            return <div><img height={34} src={speedskate} /></div>
        } else if (sport === 'Freestyle Skiing') {
            return <div><img height={34} src={freestyle} /></div>
        } else if (sport === 'Biathlon') {
            return <div><img height={34} src={biathlon} /></div>
        } else if (sport === 'Ceremonies') {
            return <div><img height={34} src={torch} /></div>
        } else {
            return ''
        }
    }

    generateSymbol(day) {
        if (day === 'X') {
            return <div><img height={34} src={maleSymbol} /></div>
        } else if (day === 'O') {
            return <div><img height={34} src={femaleSymbol} /></div>
        } else if (day === 'MM') {
            return <div><img height={34} src={goldMedals} /></div>
        } else if (day === 'XM') {
            return <div><img height={34} src={goldMedalMen} /></div>
        } else if (day === 'OM') {
            return <div><img height={34} src={goldMedalWomen} /></div>
        } else if (day === 'XO') {
            return <div><img height={34} src={genderSymbol} /></div>
        } else {
            return ''
        }
    }

    render() {
        const columns = [{
            Header: 'Sport',
            accessor: 'sport', width: 150
        }, {
            Header: '',
            accessor: 'sport', width: 40,
            Cell: row => this.generateSport(row.original.sport)
        }, {
            Header: 'City',
            accessor: 'city', width: 150
        }, {
            Header: '7th',
            accessor: 'day1',
            Cell: row => this.generateSymbol(row.original.day1)
        }, {
            Header: '8th',
            accessor: 'day2',
            Cell: row => this.generateSymbol(row.original.day2)
        }, {
            Header: '9th',
            accessor: 'day3',
            Cell: row => this.generateSymbol(row.original.day3)
        }, {
            Header: '10th',
            accessor: 'day4',
            Cell: row => this.generateSymbol(row.original.day4)
        }, {
            Header: '11th',
            accessor: 'day5',
            Cell: row => this.generateSymbol(row.original.day5)
        }, {
            Header: '12th ',
            accessor: 'day6',
            Cell: row => this.generateSymbol(row.original.day6)
        }, {
            Header: '13th',
            accessor: 'day7',
            Cell: row => this.generateSymbol(row.original.day7)
        }, {
            Header: '14th',
            accessor: 'day8',
            Cell: row => this.generateSymbol(row.original.day8)
        }, {
            Header: '15th',
            accessor: 'day9',
            Cell: row => this.generateSymbol(row.original.day9)
        }, {
            Header: '16th',
            accessor: 'day10',
            Cell: row => this.generateSymbol(row.original.day10)
        }, {
            Header: '17th',
            accessor: 'day11',
            Cell: row => this.generateSymbol(row.original.day11)
        }, {
            Header: '18th',
            accessor: 'day12',
            Cell: row => this.generateSymbol(row.original.day12)
        }, {
            Header: '19th',
            accessor: 'day13',
            Cell: row => this.generateSymbol(row.original.day13)
        }
        ]

        return (
            <div>
                <ReactTable data={scheduleData} className='schedule-table'
                    columns={columns}
                    showPagination={false}
                    sortable={false}
                    pageSize={scheduleData.length} />
            </div>
        )
    }
}


export default OlympicSchedule