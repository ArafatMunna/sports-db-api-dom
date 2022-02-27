const error = document.getElementById("error-message");

const toggeleSpinner = (value) => {
    document.getElementById("spinner").style.display = value;
};

const allPlayers = () => {
    document.getElementById("player-container").innerHTML = "";

    const searchBox = document.getElementById("search-box");
    const searchValue = searchBox.value;

    searchBox.value = "";

    if (searchValue == "") {
        error.innerText = "Please, write something";
    } else {
        toggeleSpinner("block");
        error.innerText = "";
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => displayPlayers(data.player));
    }
};

const displayPlayers = (players) => {
    const parent = document.getElementById("player-container");

    if (players == null) {
        error.innerText = "Result not found";
        toggeleSpinner("none");
    } else {
        players.forEach((player) => {
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="card border p-5 mb-5 text-center">
                <div class="pro-pic">
                    <img class="w-50" src="${
                        player.strThumb ? player.strThumb : ""
                    }" alt="">
                </div>
                <h2>Name: ${player.strPlayer ? player.strPlayer : ""}</h2>
                <h5>Country: ${
                    player.strNationality ? player.strNationality : ""
                }</h5>
                <p></p>
                <div class="all-button">
                    <button class="btn btn-danger delete-btn">Delete</button>
                    <button onclick="details('${
                        player.idPlayer
                    }')" class="btn btn-success">Details</button>
                </div>
            </div>
        `;
            parent.appendChild(div);

            const deletePlayers = document.getElementsByClassName("delete-btn");
            for (const deletePlayer of deletePlayers) {
                deletePlayer.addEventListener("click", (event) => {
                    event.target.parentNode.parentNode.style.display = "none";
                });
            }

            // console.log(player);
        });
        toggeleSpinner("none");
    }
};

const details = (playerId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => playerDetails(data.players[0]));
};

const playerDetails = (player) => {
    if (player.strGender === "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }
    document.getElementById("details-container").innerHTML = `
        <div class="card border p-5 mb-5 text-center">
            <div class="pro-pic">
                <img class="w-50" src="${
                    player.strThumb ? player.strThumb : ""
                }" alt="">
            </div>
            <h2>Name: ${player.strPlayer ? player.strPlayer : ""}</h2>
            <h5>Country: ${
                player.strNationality ? player.strNationality : ""
            }</h5>
            <p></p>
        </div>
    `;
    // console.log(player);
};
