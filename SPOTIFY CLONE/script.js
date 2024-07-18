let currSong = new Audio();
let songs;
async function getsongs() {
    let a = await fetch('http://127.0.0.1:5500/PROJECTS/SPOTIFY%20CLONE/SONGS/');
    let response = await a.text()
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split('/PROJECTS/SPOTIFY%20CLONE/SONGS/')[1]);
        }
    }
    return songs
}

const playmusic = (track, pause = false) => {
    // let audio=new Audio('/PROJECTS/SPOTIFY%20CLONE/SONGS/'+track)
    currSong.src = '/PROJECTS/SPOTIFY%20CLONE/SONGS/' + track
    if (!pause) {
        currSong.play()
        play.src = "assests/images/pausemusic.svg"

    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = " 00:00/00:00"
}


async function main() {
    // List of all songs
     songs = await getsongs();
    playmusic(songs[0], true)
    // console.log(songs);

    // Show all the songs in playlist 
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>  <img src="assests/images/music.svg" alt=""class="invert"width="20px">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")} </div>
                                <div>Alok</div>
                            </div>
                            <div class="playnow">
                               <span>PlayNow</span>
                            <i class="fa-solid fa-play"></i>
                            </div>
                       
       </li>`;
    }
    // Attach an Event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    play.addEventListener("click", () => {
        if (currSong.paused) {
            currSong.play()
            play.src = "assests/images/pausemusic.svg"
        }
        else {
            currSong.pause()
            play.src = "assests/images/playmusic.svg"
        }
    })
    // Play first song
    // var audio=new Audio(songs[0]);
    // audio.play();
    // audio.addEventListener("loadeddata",()=>{
    //     let duration=audio.duration
    //     console.log(duration);
    // });

    // Time duration display
    function convertSecondsToMinutes(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
        // Calculate minutes and remaining seconds
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60);

        // Pad single digit minutes and seconds with a leading zero
        let paddedMinutes = String(minutes).padStart(2, '0');
        let paddedSeconds = String(remainingSeconds).padStart(2, '0');

        // Combine minutes and seconds into MM:SS format
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    currSong.addEventListener("timeupdate", () => {
        // console.log(currSong.currentTime, currSong.duration);
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currSong.currentTime)}/${convertSecondsToMinutes(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime / currSong.duration) * 100 + "%"
    })

    // Add event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currSong.currentTime = ((currSong.duration) * percent) / 100
    })


    // Add event listener to humburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0"
    })
    // Add event listener to close hamberger
    document.querySelector(".close").addEventListener("click",()=>{
document.querySelector(".left").style.left="-120%"
    })


    // Add event listener to previous button
 previous.addEventListener("click",()=>{
    currSong.pause()

    // console.log("Previous clicked"); 
    let index=songs.indexOf(currSong.src.split("/").slice(-1)[0])
   if((index-1)>=0){
    playmusic(songs[index-1]);
   }
      

 })
 // Add event listener to  next button
 next.addEventListener("click",()=>{
    currSong.pause()
    // console.log("next clicked");
   let index=songs.indexOf(currSong.src.split("/").slice(-1)[0])
   if((index+1) < songs.length){
    playmusic(songs[index+1]);
   }
 })
  //   Add event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    // console.log(e,e.target,e.target.value);
    currSong.volume=parseInt(e.target.value)/100
        })
}
main()
