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
import Toggle from '../Components/Toggle'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class OlympicSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            options: ['All cities', 'Åre', 'Stockholm', 'Falun'],
            medalData: [],
            toggleMedal: true


        }

    }

    componentDidMount() {
        this.setState({ data: scheduleData })
    }

    generateData = () => {
        console.log(this.state.toggleMedal)
        if (this.state.toggleMedal) {
            console.log(this.state.data)
            console.log(this.state.medalData)
            this.setState({ data: this.state.medalData })
            this.setState({ toggleMedal: !this.state.toggleMedal })
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

    toggleMedals = () => {
        let array = []

        for (let i = 0; i < scheduleData.length; i++) {
            let obj = {}

            for (let props in scheduleData[i]) {
                if (props === 'sport') {
                    obj.sport = scheduleData[i][props]
                }
                if (props === 'city') {
                    obj.city = scheduleData[i][props]
                }
                if (scheduleData[i][props] === 'MM') {
                    const day = props
                    obj[day] = 'MM'

                }
                if (scheduleData[i][props] === 'XM') {
                    const day = props
                    obj[day] = 'XM'

                }
                if (scheduleData[i][props] === 'OM') {
                    const day = props
                    obj[day] = 'OM'
                }
            }

            if (Object.keys(obj).length > 2) {
                array.push(obj)
            }

        }
        console.log(array)
        this.setState({ medalData: array })
        
        this.generateData()

    }

    toggleMen = () => {
        let array = []

        for (let i = 0; i < this.state.data.length; i++) {
            let obj = {}
            for (let props in this.state.data[i]) {
                if (props === 'sport') {
                    obj.sport = this.state.data[i][props]
                }
                if (props === 'city') {
                    obj.city = this.state.data[i][props]
                }
                if (this.state.data[i][props] === 'X') {
                    const day = props
                    obj[day] = 'X'

                }
                if (this.state.data[i][props] === 'XM') {
                    const day = props
                    obj[day] = 'XM'

                }
                if (this.state.data[i][props] === 'MM') {
                    const day = props
                    obj[day] = 'MM'
                }
            }
            if (Object.keys(obj).length > 2) {
                array.push(obj)
            }


        }

        this.setState({ data: array })

    }

    toggleWomen = () => {
        let array = []

        for (let i = 0; i < this.state.data.length; i++) {
            let obj = {}
            for (let props in this.state.data[i]) {
                if (props === 'sport') {
                    obj.sport = this.state.data[i][props]
                }
                if (props === 'city') {
                    obj.city = this.state.data[i][props]
                }
                if (this.state.data[i][props] === 'O') {
                    const day = props
                    obj[day] = 'O'

                }
                if (this.state.data[i][props] === 'OM') {
                    const day = props
                    obj[day] = 'OM'

                }
                if (this.state.data[i][props] === 'MM') {
                    const day = props
                    obj[day] = 'MM'
                }
            }
            if (Object.keys(obj).length > 2) {
                array.push(obj)
            }


        }

        this.setState({ data: array })

    }

    onSelectCity = (event) => {

        if (event.value === 'All cities') {
            this.setState({ data: scheduleData })
        } else {
            let array = scheduleData.filter(sport => sport.city === event.value)
            this.setState({ data: array })
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
                <Dropdown options={this.state.options} onChange={this.onSelectCity} placeholder='Select city' className='schedule-table' />
                <Toggle toggle={this.toggleMedals} />
                <Toggle toggle={this.toggleMen} />
                <Toggle toggle={this.toggleWomen} />
                <ReactTable data={this.state.data} className='schedule-table'
                    columns={columns}
                    showPagination={false}
                    sortable={false}
                    pageSize={this.state.data.length} />
            </div>
        )
    }
}


export default OlympicSchedule