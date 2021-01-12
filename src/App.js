import './App.css';
import { PureComponent } from 'react';
import config from './api/server.json';

export default class App extends PureComponent {
  
    constructor() {
        super();
        this.state = {
          list: [],
          current: null,
          edit: false,
          title: '',
          body: ''
        };
        this.getList();
    }

    async getList() {
        let response = await fetch(`http://${config.host}:${config.port}/list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();
        this.setState({
            list: json.list
        });
    }

    showItem(item) {
        this.setState({current: item});
    }

    newItem() {
        let item = {
            id: -1,
            title: '',
            body: ''
        };
        this.setState({
            current: item,
            edit: true,
            title: '',
            body: ''
        });
    }

    async saveItem() {
        let current = this.state.current;
        current.title = this.state.title;
        current.body = this.state.body;
        if (current.id < 0) {
            await fetch(`http://${config.host}:${config.port}/item`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(current)
            });
        } else {
            await fetch(`http://${config.host}:${config.port}/item?id=${current.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(current)
            });
        }
        let response = await fetch(`http://${config.host}:${config.port}/list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();
        this.setState({
            current: null,
            edit: false,
            list: json.list
        });
    }

    async deleteCurrent() {
        let current = this.state.current;
        await fetch(`http://${config.host}:${config.port}/item?id=${current.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let response = await fetch(`http://${config.host}:${config.port}/list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();
        this.setState({
            current: null,
            edit: false,
            list: json.list
        });
    }
  
    render() {
        return (
            <div className="App">
                {this.state.current == null && <div className="list">
                    <h1>Blog</h1>
                    <div class="list">
                        {this.state.list.map((item) => {
                            return (<a key={item.id} onClick={() => {this.showItem(item)}}>
                                {item.title}
                            </a>);
                        })}
                    </div>
                    <button onClick={() => {this.newItem()}}>Create New</button>
                </div>}
                {this.state.current != null && this.state.edit &&
                    <div class="editor">
                        <label for="title">Title:</label>
                        <input type="text" name="title" value={this.state.title}
                            onChange={(e) => {this.setState({title: e.currentTarget.value})}}>
                        </input>
                        <label for="body">Body:</label>
                        <textarea type="text" name="body" value={this.state.body}
                            onChange={(e) => {this.setState({body: e.currentTarget.value})}}>
                        </textarea>
                        <div>
                            <button onClick={() => {this.saveItem()}}>Save</button>
                            <button onClick={() => {this.setState({edit: false, current: null})}}>Cancel</button>
                        </div>
                    </div>
                }
                {this.state.current != null && !this.state.edit &&
                    <div>
                        <h1>{this.state.current.title}</h1>
                        <div>{this.state.current.body}</div>
                        <button onClick={() => {this.setState({
                            edit: true,
                            title: this.state.current.title,
                            body: this.state.current.body
                        })}}>Edit</button>
                        <button onClick={() => {this.setState({current: null})}}>Back</button>
                        <button onClick={() => {this.deleteCurrent()}}>Delete</button>
                    </div>
                }
            </div>
        );
    }
}

