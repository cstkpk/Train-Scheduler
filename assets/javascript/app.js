// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBIdaZ4PboKCjP8iOZnZm96MRDBHEzKKgs",
    authDomain: "train-scheduler-48407.firebaseapp.com",
    databaseURL: "https://train-scheduler-48407.firebaseio.com",
    projectId: "train-scheduler-48407",
    storageBucket: "",
    messagingSenderId: "892783396057",
    appId: "1:892783396057:web:4f77d11b901d0b46"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Creating database variable
var database = firebase.database();

// Submit button for adding a new train
$("#submit").on("click", function(event){
    event.preventDefault();

    // Grab user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    // var firstTrainTime = moment($("#first-train").val().trim(), "HH:mm").format("X");
    var firstTrainTime = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    
    if (!trainName || !destination || !firstTrainTime || !frequency) {
        // alert("Please fill out the form");
        $("#modal-test").modal("show");
        return false;
    }

    // Creates local "temporary" object for holding train data
    var temp = {
        train: trainName,
        destination: destination,
        firstTrain: firstTrainTime,
        frequency: frequency
    }

    // Upload train data to the database
    database.ref().push(temp);

    // Log user input to the console
    // console.log("Train name: " + trainName);
    // console.log("Destination: " + destination);
    // console.log("First train time: " + firstTrainTime);
    // console.log("Frequency: " + frequency);

    // Clear all of the text boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
// database.ref().on('child_added', function(childSnapshot) {
//     console.log(childSnapshot.val());

//     // Store everything into a variable.
//     var trainName = childSnapshot.val().train;
//     var destination = childSnapshot.val().destination;
//     var firstTrainTime = childSnapshot.val().firstTrain;
//     var frequency = childSnapshot.val().frequency;
//     // console.log("First train time: " + moment(firstTrainTime, "X").format("HH:mm"));
//     console.log("First train time: " + firstTrainTime);

//     // Calculate minutes away by first:
//     // Subtracting firstTrainTime from current time and finding the modulus between this difference and frequency
//     // var remainder = moment().diff(moment.unix(parseInt(firstTrainTime)), "minutes") % frequency;
//     var remainder = moment().diff(moment(firstTrainTime, "HH:mm").subtract(1, "years"), "minutes") % frequency;
//     // Then find difference between frequency and remainder
//     var minAway = frequency - remainder;
//     console.log("Minutes away: " + minAway);

//     // Calculate next arrival
//     var nextArrival = moment().add((minAway), "m").format("hh:mm a");
//     console.log("Next arrival: " + nextArrival);

//     // Create the new row
//     var newRow = $("<tr>").append(
//         $("<td>").text(trainName),
//         $("<td>").text(destination),
//         $("<td>").text(frequency),
//         $("<td>").text(nextArrival),
//         $("<td>").text(minAway)
//     );
    
//     // Append the new row to the table
//     $("#train-schedule").append(newRow);

// });

function trainTimes() {
    $("tbody").empty();
    database.ref().on('child_added', function(childSnapshot) {
        console.log(childSnapshot.val());
    
        // Store everything into a variable.
        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
        console.log("First train time: " + firstTrainTime);
    
        // Calculate minutes away by first:
        // Subtracting firstTrainTime from current time and finding the modulus between this difference and frequency
        var remainder = moment().diff(moment(firstTrainTime, "HH:mm").subtract(1, "years"), "minutes") % frequency;
        // Then find difference between frequency and remainder
        var minAway = frequency - remainder;
        console.log("Minutes away: " + minAway);
    
        // Calculate next arrival
        var nextArrival = moment().add((minAway), "m").format("hh:mm a");
        console.log("Next arrival: " + nextArrival);
    
        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway)
        );
        
        // Append the new row to the table
        $("#train-schedule").append(newRow);
    
    });
    
}

trainTimes();
// setInterval(trainTimes, 30000);


// https://console.firebase.google.com/u/0/project/train-scheduler-48407/overview