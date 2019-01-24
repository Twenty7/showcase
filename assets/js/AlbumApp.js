const React = require('react');

import AlbumSearch from './AlbumSearch.js';
import AlbumTiles from './AlbumTiles.js';


const DEFAULT_RENDER_TYPE = 'albumsearch'

const components = {
    albumsearch: AlbumSearch,
    albumtiles: AlbumTiles,
};

class AlbumApp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            albumSearchValue: '',
            albums: [],
            title: '',
            renderObj: '',
        };
    }

    // Parent AlbumSearch handleSubmit
    handleSubmit() {
    }

    // Update the Title and Albums content, trigger AlbumTiles DisplayAlbums event
    setAlbums(albums, title) {
        this.props = {
            renderObj: "albumtiles"
        }
        this.setState({
            albums: albums,
            title: title
        });
        this.props.eventHandler.emit('DISPLAY_ALBUMS', {
            props: this.props,
            state: this.state
        });
    }

    // Dynamically render appropriate child component
    render() {
        const { renderObj } = this.props
        const renderType = renderObj || DEFAULT_RENDER_TYPE
        const $comp = components[renderType];

        return (
            <div>
                <$comp 
                    albums={this.state.albums}
                    title={this.state.title} 
                    albumSearchValue={this.state.albumSearchValue}
                    handleSubmit={this.handleSubmit.bind(this)}
                    setAlbums={this.setAlbums.bind(this)}
                    eventHandler={this.props.eventHandler}
                />
            </div>
        )
    }
}
export default AlbumApp;
