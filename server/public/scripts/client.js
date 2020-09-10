$( document ).ready( onReady );

function onReady(){
    getSongs();
    $( '#addSongButton' ).on( 'click', addSong );
    $(document).on('click', '.deleteSongButton', deleteSong);
} // end onReady

function deleteSong() {
    let songId = $(this).data('id');
    
    $.ajax({
        method: 'DELETE',
        url: `/songs/${songId}`,
    }).then(function(response){
        console.log('deleted', response);
        // TODO: Refresh page (aka another get req)
        getSongs();
    }).catch(function(err){
        console.log('error:', err);
        alert("Oopsies! ERROR");
    });
}

function addSong(){
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    } // end object to send
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getSongs();
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX POST
} // end addSong

function getSongs(){
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response ); 
        // display songs on DOM 
        let el = $( '#songsOut' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append( `<li>
            ${ response[i].rank }
            ${ response[i].track }
            ${ response[i].artist }
            ${ response[i].published.split( 'T' )[0] }
            <button class="deleteSongButton" data-id="${response[i].id}">Delete!</button>
            <button class="rankUpButton" data-id="${response[i].id}">Up!</button>
            <button class="rankDownButton" data-id="${response[i].id}">Down!</button>
            </li>`);
        } // end for
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }); // end AJAX GET
} // end getSongs()