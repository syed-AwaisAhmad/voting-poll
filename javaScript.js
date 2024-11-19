
$(document).ready(function () {
    var selectedOption = "";
    let jsonOPT = {};
    let optionCount = 2;
    let poll = `<div class="col-md-4 col-sm-12 pollInfo">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="text-center mb-3" >Poll <span><i class="fa"></i></span></h3><hr>
                                <label for="question">Question</label><br>
                                <input type="text" class="question" placeholder="What is your question">
                                <label>Expiration </label>br
                                <input type="date" class="form-control mt-3" placeholder="First name">
                                <input type="time" class="form-control mt-3 mb-3" placeholder="First name">

                                <label>Options</label><br>
                                <div id="options-container">
                                    <input type="text" id="option1" class="option mt-2 form-control" placeholder="add option">
                                    <input type="text" id="option2" class="option mt-3 form-control" placeholder="add option"><br>
                                </div>
                                <button class="add-btn btn btn-primary  mt-4" type="button"><i class="fa-thin fa-plus" style="font-size: 20px;"></i>Add options</button><hr>
                                <button class="save-btn btn btn-primary text-center" type="button" > Save </button>
                            </div>
                        </div>
                     </div>`
    //-------------------------------------Creating Poll card-------------------------------
    $(".create-btn").on("click", function () {

        $(".create-poll").append(poll);

    })

    $(document).on("click", ".add-btn", function () {
        optionCount++;
        let option = `<div class="input-group mt-3">
                           <div class="generic-option"> 
                                <input type="text" name="option${optionCount}" id="option${optionCount}" class="form-control" placeholder="Add option">
                                <span class="input-group-text bg-transparent border-0 rmv-btn">
                                    <i class="fa-sharp cross-icon  fa-solid fa-xmark"></i>
                                </span>
                            </div>
                    </div>`


        console.log("hello add btn");
        //  $(document).find(".card-header #option2").append(option);
        $(this).closest(".card-header").find("#options-container").append(option);
    })
    //--------------------------------------------------------------------removing input field------------------------------------
    $(document).on("click", ".rmv-btn", function () {
        console.log("hello remove btn");
        $(this).closest(".generic-option").find("input", ".fa-xmark").remove();

    })
    $(document).on("click", ".save-btn", function () {
        let quest = $(".question").val();
        let optionValue = "";
        let isEmpty = false;
        $(this).closest(".card-header").find("#options-container .option").each(function (index, element) {
            optionValue = $(element).val();
            if (optionValue == "") {
                isEmpty = true;
            }
            else {
                jsonOPT[optionValue] = [];
            }
        });
        if (isEmpty) {
            alert("please enter all fields");
            return;
        }
        $(this).closest(".pollInfo").addClass("d-none");
        showVotingCard(quest);
        console.log(jsonOPT);

        // console.log(jsonOPT[optionValue]);
    })
    function showVotingCard(Question) {
        let size;
        console.log("hello show voting card")
        let card = `<div class="col-md-4 card voting-card-info">
                            <div class="card-header">
                                <h5 class="text-center mb-3" >${Question}</h5><hr>`;
        Object.keys(jsonOPT).forEach((key) => {
            // size = jsonOPT.key.length;
            console.log("size");
            card += `<button class="option-btn btn btn-primary mt-3" value="${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">${key}<span class="counter me-0"></span></button>`;
        });
        card += `<button class="detail-btn btn btn-primary text-center mt-3" type="button" > View Details</button>
                            </div>
                        </div>`;
        $(".create-poll").append(card);
    }

    $(document).on("click", ".option-btn", function () {
        selectedOption = $(this).text();
    })
    //-----------------------------------------------------getting voter name----------------------------
    $(document).on("click", ".save-name", function () {
        let inputName = $("#voterName").val();
        console.log(selectedOption + "and name =:" + inputName);
        onSelectingOption(selectedOption, inputName)
        $("#voterName").val("");
        $('#exampleModal').modal('toggle');

    })
    $(document).on("click", ".detail-btn", function () {
        showDetails();
    })
    //------------------------------------------------------check duplicate------------------------------------------
    function onSelectingOption(option, name) {
        let duplicate = true;
        Object.keys(jsonOPT).forEach((key) => {
            jsonOPT[key].forEach((inputName, index) => {
                if (name === inputName && option === key) {
                    // Use the index to remove the item
                    jsonOPT[key].splice(index, 1);
                    duplicate = false;
                    return;
                }
                if (name == inputName) {
                    alert("you can only select one option");
                    duplicate = false;
                    return;
                }


            })

        })
        if (duplicate) {
            jsonOPT[option].push(name);
        }
        console.log(jsonOPT);
    }
    //----------------------------------------------------showing details-------------------------------------------
    function showDetails() {
        let detailCard = ` <div class="card col-md-4">
                                <div class="card-header">
                                    <h2 class="text-center mb-4">Details</h2><hr>`
        Object.keys(jsonOPT).forEach((key) => {
            detailCard += `<p><h5>${key}</h5>`
            jsonOPT[key].forEach((item) => {
                detailCard += `<span>${item}</span>`
            })
            detailCard += `</p>`
        })
        detailCard += `</div>
                                </div>`
        $(".create-poll").append(detailCard);
    }


})