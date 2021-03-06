import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wheel from "../../assets/img/wheel_v2.png";
import './spinner.scss'
import Items from '../../constants/Items';
import ReactTimeout from 'react-timeout'

class Spinner extends Component {
    state = {
        spin: false,
        disabled: true
    };

    componentDidMount() {
        this.props.setTimeout(this.start, 5000)
    }

    start = () => {
        this.setState({
            spin: true,
            disabled: false
        });
        return this.props.setTimeout( () => {
            const result = this.getResult();
            this.sendResult(result);
            }, 10000
        )
    };

    getResult = () => {
        return {
            first_wheel: Items[Math.floor(Math.random() * Items.length)],
            second_wheel: Items[Math.floor(Math.random() * Items.length)],
            third_wheel: Items[Math.floor(Math.random() * Items.length)],
        }
    };

    stop = () => {
        const result = this.getResult();
        this.sendResult(result);
        return this.setState({spin: false});
    };

    sendResult(result) {
        const { history } = this.props;
        const newPath = `/result`;
        history.push(newPath);
        history.push(result);
    }

    renderSpinner = (spin) => {
        return (
            <div className="spinner-container">
                <span className="spinner-wrapper">
                    <img src={wheel} className={spin ? 'first_spin' : ''} alt="" width="90%" height="80%"/>
                </span>
                <span className="spinner-wrapper">
                    <img src={wheel} className={spin ? 'second_spin' : ''} alt="" width="90%" height="80%"/>
                </span>
                <span className="spinner-wrapper">
                    <img src={wheel} className={spin ? 'third_spin' : ''} alt="" width="90%" height="80%"/>
                </span>
            </div>
        )
    };

    render() {
        const { spin, disabled } = this.state;
        return (
            <div className="control">
                <div className="box">
                    <h1 className="slot-machine-title">Slot Machine</h1>
                    {this.renderSpinner(spin)}
                    <button ref='button' disabled={!disabled} onClick={this.start}>START</button>
                    <button ref='button' disabled={!spin} onClick={this.stop}>
                        <Link to="/result">STOP</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default ReactTimeout(Spinner);