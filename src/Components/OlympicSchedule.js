import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {scheduleData} from '../Data/OlympicScheduleData'
import Toggle from '../Components/Toggle'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
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
            data: [],
            options: ['All cities', 'Åre', 'Stockholm', 'Falun'],
            medalData: [],
            toggleMedal: false,
            åreData: [],
            falunData: [],
            stockholmData: [],
            toggleFalun: false,
            toggleStockholm: false,
            toggleÅre: false,
            selectedCity: 'Select a city'
        }

    }

    columns = [{
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

    componentDidMount() {
        this.setState({data: scheduleData});
        this.generateCityData(scheduleData);
        this.generateMedalData(scheduleData);
    }

    generateSport(sport) {
        if (sport === 'Alpine Skiing') {
            return <div><img height={34} src={alpine}/></div>
        } else if (sport === 'Ice Hockey') {
            return <div><img height={34} src={hockey}/></div>
        } else if (sport === 'Figure Skating') {
            return <div><img height={34} src={figure}/></div>
        } else if (sport === 'Ski Jumping') {
            return <div><img height={34} src={skiJump}/></div>
        } else if (sport === 'Snowboard') {
            return <div><img height={34} src={snowboard}/></div>
        } else if (sport === 'Curling') {
            return <div><img height={34} src={curling}/></div>
        } else if (sport === 'Speed Skating') {
            return <div><img height={34} src={speedskate}/></div>
        } else if (sport === 'Freestyle Skiing') {
            return <div><img height={34} src={freestyle}/></div>
        } else if (sport === 'Biathlon') {
            return <div><img height={34} src={biathlon}/></div>
        } else if (sport === 'Ceremonies') {
            return <div><img height={34} src={torch}/></div>
        } else {
            return ''
        }
    }

    generateSymbol(day) {
        if (day === 'X') {
            return <div><img className={'tooltip-on-hover'} height={34} src={maleSymbol}/>
                <div className="tooltip">Men's match</div></div>
        } else if (day === 'O') {
            return <div><img className={'tooltip-on-hover'}  height={34} src={femaleSymbol}/>
                <div className="tooltip">Women match</div></div>

        } else if (day === 'MM') {
            return <div><img className={'tooltip-on-hover'}  height={34} src={goldMedals}/>
                <div className="tooltip">Men's/Women medal</div></div>
        } else if (day === 'XM') {
            return <div><img className={'tooltip-on-hover'} height={34} src={goldMedalMen}/>
                <div className="tooltip">Men's medal</div></div>
        } else if (day === 'OM') {
            return <div><img className={'tooltip-on-hover'} height={34} src={goldMedalWomen}/>
                <div className="tooltip">Women medal</div></div>
        } else if (day === 'XO') {
            return <div><img className={'tooltip-on-hover'} height={34} src={genderSymbol}/>
                <div className="tooltip">Men's/Women</div></div>
        } else {
            return ''
        }
    }

    toggleData = () => {
        this.setState({toggleMedal: !this.state.toggleMedal, toggleMen: !this.state.toggleMen}, () => {
            if (this.state.toggleMedal) {
                this.setState({data: this.generateMedalData(this.state.data)})
            } else if (!this.state.toggleMedal && this.state.toggleStockholm) {
                this.setState({data: this.state.stockholmData});
            } else if (this.state.toggleMedal && this.state.toggleFalun) {
                this.setState({data: this.generateMedalData(this.state.falunData)})
            } else if (!this.state.toggleMedal && this.state.toggleFalun) {
                this.setState({data: this.state.falunData});
            } else if (this.state.toggleMedal && this.state.toggleÅre) {
                this.setState({data: this.generateMedalData(this.state.åreData)})
            } else if (!this.state.toggleMedal && this.state.toggleÅre) {
                this.setState({data: this.state.åreData});
            } else if (!this.state.toggleStockholm && !this.state.toggleFalun && !this.state.toggleÅre) {
                this.setState({data: scheduleData})
            }
        })
    }

    generateMedalData = (data) => {
        let array = []
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            for (let props in data[i]) {
                if (props === 'sport') {
                    obj.sport = data[i][props]
                }
                if (props === 'city') {
                    obj.city = data[i][props]
                }
                if (data[i][props] === 'MM') {
                    const day = props
                    obj[day] = 'MM'

                }
                if (data[i][props] === 'XM') {
                    const day = props
                    obj[day] = 'XM'

                }
                if (data[i][props] === 'OM') {
                    const day = props
                    obj[day] = 'OM'
                }
            }
            if (Object.keys(obj).length > 2) {
                array.push(obj)
            }
        }
        this.setState({medalData: array});
        return array;
    }

    generateCityData = (data) => {
        let stockholm = data.filter(sport => sport.city === 'Stockholm');
        this.setState({stockholmData: stockholm})

        let åre = data.filter(sport => sport.city === 'Åre');
        this.setState({åreData: åre})

        let falun = data.filter(sport => sport.city === 'Falun');
        this.setState({falunData: falun})
    }

    onSelectCity = (event) => {
        if (event.value === 'Stockholm') {
            this.setState({toggleStockholm: true, toggleFalun: false, toggleÅre: false}, () => {
                this.setState({data: this.state.stockholmData, selectedCity: 'Stockholm'});
            })
        } else if (event.value === 'Falun') {
            this.setState({toggleStockholm: false, toggleFalun: true, toggleÅre: false}, () => {
                this.setState({data: this.state.falunData, selectedCity: 'Falun'});
            })
        } else if (event.value === 'Åre') {
            this.setState({toggleStockholm: false, toggleFalun: false, toggleÅre: true}, () => {
                this.setState({data: this.state.åreData, selectedCity: 'Åre'});
            })
        } else {
            this.setState({toggleStockholm: false, toggleFalun: false, toggleÅre: false}, () => {
                this.setState({data: scheduleData, selectedCity: 'All cities'});
            })
        }
        if (this.state.toggleMedal) {
            this.setState({toggleMedal: !this.state.toggleMedal}, () => {
                this.toggleData();
            })
        }
    }

    render() {
        return (
            <div>
                <div className='toggle-container'>
                    <p className='toggle-text'>Medals only</p>
                    <Toggle toggle={this.toggleData}/>
                    <div className='dropdown-container'>
                        <Dropdown options={this.state.options} onChange={this.onSelectCity}
                                  placeholder={this.state.selectedCity} controlClassName={'dropdown'}
                                  menuClassName={'dropdown-menu'}/>
                    </div>
                </div>
                <ReactTable data={this.state.data} className='schedule-table'
                            columns={this.columns}
                            showPagination={false}
                            sortable={false}
                            pageSize={this.state.data.length}/>
            </div>
        )
    }
}


export default OlympicSchedule