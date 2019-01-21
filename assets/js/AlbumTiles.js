const React = require('react');

class AlbumTiles extends React.Component {
    state = {
        title: this.props.title,
        albums: this.props.albums,
    }

    constructor(props){
        super(props);
        this.displayAlbums = this.displayAlbums.bind(this);
    }

    // Initilize AlbumTiles by loading Content
    componentDidMount() {
        fetch('/artist/album-top10', {
            method: 'GET',
        }).then( (response) => {
            return response.json();
        }).then( (json) => {
            this.props.setAlbums(json.albums, 'Top Albums');
        }).catch( (ex) => {
            console.log('Error: ', ex)
        });
    }

    // Trigger render on AlbumTiles
    displayAlbums(settings) {
        this.setState(settings.state);
    }

    // Listen for event
    componentWillMount() {
        this.props.eventHandler.on('DISPLAY_ALBUMS', this.displayAlbums);
    }
  
    //Remove listener 
    componentWillUnmount() {
        this.props.eventHandler.removeListener('DISPLAY_ALBUMS', this.displayAlbums);
    }

    // Display AlbumTiles Content
    render() {
        if (this.state.albums) {
            const renderAlbums = this.state.albums.map(function(album, i) {
                return <li key={i}>{album.title}</li>
            });
            return (
                <div>
                    <h3 className="section-title">{this.state.title}</h3>
                    <ul className="album-tiles-ul">
                        {renderAlbums}
                    </ul>
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}
export default AlbumTiles;
