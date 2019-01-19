/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.scss in this case)
require('../css/app.scss');

// Init Libraries
const $ = require('jquery');
require('bootstrap');
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');
const React = require('react');
const ReactDOM = require('react-dom');


console.info('app.js');

class AlbumApp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            albumSearchValue: '',
            albums: [],
            title: '',
        };
    }
    handleChange(albumSearchValue) {
        this.setState({
            albumSearchValue: albumSearchValue
        })
    }
    handleSubmit(albums, title) {
        this.setState({
            albums: albums,
            title: title
        });
    }
    render() {
        return (
            <div>
                <AlbumSearchForm albums={this.state.albums} title={this.state.title} albumSearchValue={this.state.albumSearchValue} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
                <AlbumTiles albums={this.state.albums} title={this.state.title}  albumSearchValue={this.state.albumSearchValue} />
            </div>
        )
    }
}
export default AlbumApp;

class AlbumSearchForm extends React.Component {
    handleChange(target) {
        this.props.handleChange(target.value);
    }

    handleSubmit() {
        event.preventDefault();
        console.debug(this.props.albumSearchValue, 'submit');
        var data = {
            'search-string': this.props.albumSearchValue
        };
        return fetch('/artist/album-search', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then( (response) => {
            return response.json();
        }).then( (json) => {
            // AlbumTiles.setAlbums(json.albums, 'Search Results');
            console.log('parsed json', json);
            // AlbumTiles.render({albums: json.albums, title: 'Results'});
            this.props.handleSubmit(json.albums, 'Search Results');
            // return <AlbumTiles albums={json.albums} title='Search Results' />;
        }).catch( (ex) => {
            console.log('Error: ', ex);
        });
    }

    componentDidMount() {
        fetch('/artist/album-top10', {
            method: 'GET',
        }).then( (response) => {
            return response.json();
        }).then( (json) => {
            this.props.handleSubmit(json.albums, 'Top Albums');
            console.log('parsed json', json)
        }).catch( (ex) => {
            console.log('Error: ', ex)
        });
    }

    render() {
        return (
            <form className="form-inline my-2 my-lg-0" id="album-search-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="mx-auto">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="album-search" name="albumSearchValue" onChange={this.handleChange.bind(this)} />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search</button>
                </div>
            </form>
        )
    }
}

class AlbumTiles extends React.Component {
    render() {
        console.debug('albums render');
        if (this.props.albums) {
            const renderAlbums = this.props.albums.map(function(album, i) {
                return <li key={i}>{album.title}</li>
            });
            return (
                <div>
                    <h4>Title: {this.props.title}</h4>
                    <ul className="album-tiles-ul">
                        {renderAlbums}
                    </ul>
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}


// ReactDOM.render(
//     <AlbumSearchForm />,
//     document.getElementById('album-search-form-container')
// );

// ReactDOM.render(
//     <AlbumTiles />,
//     document.getElementById('album-tiles')
// );

ReactDOM.render(
    <AlbumApp>
        <AlbumSearchForm/>
        <AlbumTiles/>
    </AlbumApp>,
    document.getElementById('main-content')
);


