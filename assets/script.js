//variable needed for getting/setting text in local storage
var sLocalStorageName = "obj_daily_tasks";


  //-------------------------------------------loadPage()
  function loadPage() {
    var iStartAfter = 8;


    var sDivIdBase = "hour-";
    var sRowTimeBlockBase = "row time-block ";
    var sRowTimeBlock = "";
    var $clContainer = $('.container-fluid');


    //using day.js to get the date
    var dDate = dayjs();
    dDate.set('seconds', 0);
    var screenDate = dDate;
    screenDate = screenDate.set('hour', iStartAfter);
    var dHour = dDate.hour();


   //show the current date
   var currentDayArea = $('#currentDay');
  var sCurrDateToShow = dayjs().format('dddd, MMMM D' );
   currentDayArea.text(sCurrDateToShow);




    //create rows by using a for loop
    for(var iRow = 9; iRow <= 17; iRow++) {
      screenDate = screenDate.add(1, 'hour');
      var dHourScreen = screenDate.hour();
     
      //showcasing the past, present, and future rows
      if(screenDate.isBefore(dDate)) {
        sRowTimeBlock = sRowTimeBlockBase + "past";
      } else {
        if (dDate.isBefore(screenDate)) {
          sRowTimeBlock = sRowTimeBlockBase + "future";
        } else {
          sRowTimeBlock = sRowTimeBlockBase + "present";
        }
      }
     
      var sRowNum = String(iRow);
      var sDivId = sDivIdBase + sRowNum;


      var $rowDiv = $("<div/>")
        .attr("id", sDivId)
        .addClass(sRowTimeBlock);


      //the <div> for the hour
      var $hourDiv = $("<div/>")
        .addClass("col-2 col-md-1 hour text-center py-3");
       
      //converting the hour into AM/PM
      var sHour = screenDate.format('h A');
      var sPHour = "<p>" + sHour + "</p>";
      var $hourP = $(sPHour);
      $hourDiv.append($hourP);
      $rowDiv.append($hourDiv);


      //the <textarea> used for setting tasks
      var $textArea = $("<textarea/>")
        .addClass("col-8 col-md-10 description");
      $rowDiv.append($textArea);


      //the <button> used to save tasks
      var $buttonSave = $("<button/>")
        .attr("aria-label", "save")
        .addClass("btn saveBtn col-2 col-md-1");


      var $iArea = $("<i/>")
        .attr("aria-hidden", "true")
        .addClass("fas fa-save");


      $buttonSave.append($iArea);
      $rowDiv.append($buttonSave);


      $clContainer.append($rowDiv);
    }  //--------------------- end of for loop for rows


   
    //---------------------buttons
    let btns = $("button.saveBtn"); // will select only buttons with needed class
   
    //disabling the button - that is, the user cannot save an event if the hour is already in the past.
    //we use the variable
    btns.each(function(){
      let btn  = $(this);


      var bDisableSaveButton = false;
      if(bDisableSaveButton) {
        var btnParent = btn.parent();
        let btnStatus = String(btnParent.attr('class'));
        if(btnStatus.includes('past')) {
          return;
        }
      }




      //Verification is needed if the user wants to change the task that is already in progress.
       btn.on('click',()=>{
        var sParent = $(this).parent();
        let status = String(sParent.attr('class'));
        if(status.includes("present")) {
          if(!confirm('Task is in progress. Press OK if you want to change present task.')) {
            return;
          }
        }


        //Working with local storagae
        var sParentId = $(sParent).attr("id");
        var sHour = $(sParent).children(".hour").text();
        var sText = $(sParent).children(".description").val();
        saveToLocalStorage(sParentId, sHour, sText);  
       })
    })


    //---Getting/Setting tasks for the hours
    var objTasks = localStorage.getItem(sLocalStorageName);


      if(objTasks == null || objTasks == "undefined") {
        var allTasks = [];
      } else {
        var allTasks = JSON.parse(objTasks);
      }


      for(var i = 0; i < allTasks.length; i++) {
        var sTaskId = allTasks[i].id;
        var sTaskHour = allTasks[i].hour;
        var sTaskText = allTasks[i].task;


        sTaskId = "#" + sTaskId;
        var divParent = $(sTaskId);
        var textArea = $(divParent).children('.description');
        textArea.val(sTaskText);


      }
  }


    //----------------------------------------------------saveToLocalStorage()
    function saveToLocalStorage(sParentId, sHour, sText) {
      var bExists = false;
      var iExistingIndex = -1;
      var objTasks = localStorage.getItem(sLocalStorageName);


      if(objTasks == null || objTasks == "undefined") {
        var allTasks = [];
      } else {
        var allTasks = JSON.parse(objTasks);
      }


      //check if the value exists
      for(var x = 0; x < allTasks.length; x++) {
        if(allTasks[x].id == sParentId) {
          iExistingIndex = x;
          bExists = true;
          break;
        }
      }


      //if the user clicks on the 'save' button twice, the person is warned that the task is saved.
      if(bExists) {
        if(allTasks[iExistingIndex].task == sText) {
          alert("The same task for " + sHour + " was already saved.");
          return;
        } else {
          //Update the task
          allTasks[iExistingIndex].task = sText;
        }
      } else {
        //create the new task...
        var aTask = {id: sParentId, hour: sHour, task: sText};
        allTasks.push(aTask);
      }
      //...and send it to local storage
      localStorage.setItem(sLocalStorageName, JSON.stringify(allTasks));
    }