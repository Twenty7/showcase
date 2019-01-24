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
                return (
                    <div key={i} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" src={"http://coverartarchive.org/release-group/" + album.gid + "/front-500"} alt="Album Artwork" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {album.name}
                                </h5>

                                <div className="card-artist-name">
                                    by {album.artist_name}
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <small className="card-album-year text-muted float-right">
                                        {album.release_year}
                                    </small>
                                    <small className="card-album-tracks text-muted">{album.track_cnt} tracks</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
            return (
                <div>
                    <h3 className="section-title">{this.state.title}</h3>
                    <div className="row">
                        {renderAlbums}
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}
export default AlbumTiles;
