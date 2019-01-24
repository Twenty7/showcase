const React = require('react');

class AlbumSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            albumSearchValue: '',
            albums: [],
            title: '',
            renderObj: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // Updates search string state
    handleChange(event) {
        this.setState( {[event.target.name]: event.target.value} );
    }

    // Process the AlbumSearch Form
    handleSubmit() {
        event.preventDefault();
        var data = {
            'search-string': this.state.albumSearchValue
        };
        return fetch('/artist/album-search', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then( (response) => {
            return response.json();
        }).then( (json) => {
            this.props.setAlbums(json.albums, 'Search Results');
        }).catch( (ex) => {
            console.log('Error: ', ex);
        });
    }

    // Display AlbumSearch form
    render() {
        return (
            <form className="form-inline my-2 my-lg-0" id="album-search-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="mx-auto">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="album-search" name="albumSearchValue" onChange={event => this.handleChange(event)} />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search</button>
                </div>
            </form>
        )
    }
}
export default AlbumSearch;
