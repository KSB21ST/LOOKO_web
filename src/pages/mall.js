import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

/*
    add a board (post)
*/
class App4 extends Component {
    state = {
        maxNo: 3,
        // boards: [
        //     {
        //         brdno: 1,
        //         brdwriter: 'Lee SunSin',
        //         brdtitle: 'If you intend to live then you die',
        //         brddate: new Date()
        //     },
        //     {
        //         brdno: 2,
        //         brdwriter: 'So SiNo',
        //         brdtitle: 'Founder for two countries',
        //         brddate: new Date()
        //     }
        // ],
        boards: [
            {
                brdno:1,
                age_from: 14,
                age_to: 100,
                country_code: "US",
                gender: 3,
                id: 71,
                last_crawl_date: "2020-09-08T14:24:01.777627Z",
                name: "J.Crew",
                soho_mall: true,
                url: "https://www.jcrew.com"
            }
        ],
    }
    
    handleSaveData = (data) => {
        console.log("handle data")
        this.setState({
            age: data.age,
            country: data.country,
            gender: data.gender,
            brand: data.brand
        });
        console.log(this.state)
    }

    getinfo = () => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios({
            url: 'http://192.168.0.12:30000/crawling/shop/',
            method: 'get',
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,
                // "content-type": "application/json"
            }
        })
        .then(response => {
            console.log(response['data'])
            response['data'].map(x => this.setState({
                boards: this.state.boards.concat({ brdno: this.state.maxNo++, ...x})
            }))

        })
        .catch(err => {console.log(err)});
    }
  
    render() {
        const { boards } = this.state;
        const { item } = this.state;

        return (
            <div>
                <BoardForm onSaveData={this.handleSaveData}/>
                <button onClick={this.getinfo}>Server</button>
                <table border="1">
                    <tbody>
                    {/* // age_from: 14
        // age_to: 100
        // country_code: "US"
        // gender: 3
        // id: 71
        // last_crawl_date: "2020-09-08T14:24:01.777627Z"
        // name: "J.Crew"
        // soho_mall: true
        // url: "https://www.jcrew.com" */}
                    <tr align="center">
                        <td width="50">num</td>
                        <td width="50">age_from</td>
                        <td width="50">age_to</td>
                        <td width="50">country</td>
                        <td width="50">gender</td>
                        <td width="50">id</td>
                        <td width="70">last_crawl_date</td>
                        <td width="50">name</td>
                        <td width="50">soho_mall</td>
                        <td width="300">url</td>
                    </tr>
                    {
                        boards.map(function(row){ 
                            return (<BoardItem key={row.brdno} row={row} />);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class BoardItem extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.row.brdno}</td>
                <td>{this.props.row.age_from}</td>
                <td>{this.props.row.age_to}</td>
                <td>{this.props.row.country_code}</td>
                <td>{this.props.row.geender}</td>
                <td>{this.props.row.id}</td>
                <td>{this.props.row.last_crawl_date}</td>
                <td>{this.props.row.name}</td>
                <td>{this.props.row.soho_mall}</td>
                <td>{this.props.row.url}</td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {}

    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    
    handleInitial = () => {
        $('input[name="chk_ctry"]').val(['NONE']);
        $('input[name="chk_gender"]').val(['0']);
        $('input[name="chk_brand"]').val(['0']);
    }

    handleInput = () => {
        var country = $('input[name="chk_ctry"]:checked').val();
        var gender = $('input[name="chk_gender"]:checked').val();
        var brand = $('input[name="chk_brand"]:checked').val();
        this.setState({
            country: country,
            gender: gender,
            brand: brand
        })
        console.log("show data")
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveData(this.state);
        this.setState({});
    }
    
    render() {
        return (
            <div>
                <button type="button" name="button" id="radioButton2" onClick={this.handleInitial}>set Value</button>
                
                <table>
                    <input placeholder="age" name="age" value={this.state.age} onChange={this.handleChange}/>
                <tbody>
                    <td>
                        <tr><input type="radio" name="chk_ctry" value="US"/>US</tr>
                        <tr><input type="radio" name="chk_ctry" value="KR"/>KR</tr>
                        <tr><input type="radio" name="chk_ctry" value="NONE"/>KR/US</tr>
                    </td>
                    <td>
                        <tr><input type="radio" name="chk_gender" value="1"/>1. Woman</tr>
                        <tr><input type="radio" name="chk_gender" value="2"/>2. Man</tr>
                        <tr><input type="radio" name="chk_gender" value="3"/>3. Unisex</tr>
                        <tr><input type="radio" name="chk_gender" value="0"/>0. View All</tr>
                    </td>
                    <td>
                        <tr><input type="radio" name="chk_brand" value="1"/>1. Soho</tr>
                        <tr><input type="radio" name="chk_brand" value="2"/>2. Brand</tr>
                        <tr><input type="radio" name="chk_brand" value="0"/>3. Soho/Brand</tr>
                    </td>
                    <tr>
                    <td><button type="submit" name="button" id="radioButton" onClick={this.handleInput}>Show</button></td>
                    <td>age: {this.state.age}</td>
                    <td>country: {this.state.country}</td>
                    <td>gender: {this.state.gender}</td>
                    <td>brand: {this.state.brand}</td>
                    <td><button type="submit" name="button" id="radioButton3" onClick={this.handleSubmit}>Send</button></td>
                    </tr>
                </tbody>
                </table>
        </div>
        );
    }
}

export default App4;
