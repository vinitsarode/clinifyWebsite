var page = 1
var title = undefined
var type = undefined
var loc = undefined

$(function () {
    $(document).scroll(function () {
        var $nav = $("header nav.main-navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});


// ==============================
// Jobs Page
// ===============================

$(document).on("click", "#jobs-page .web-filter .search-filter-btn", function(){
    title = ($(this).parent().find(".job-title-input").val()? $(this).parent().find(".job-title-input").val() : undefined);
    type = ($(this).parent().find(".job-type-select").val()?$(this).parent().find(".job-type-select").val() : undefined);
    loc = ($(this).parent().find(".job-location-input").val()?$(this).parent().find(".job-location-input").val() : undefined);
    page=1
    console.log(title, type, loc)
    axios.post('/getjobs', {
        title, 
        type, 
        location:loc,
        page
        
    }).then(function (response) {
        console.log("success")
        if(response.data.error){
            template = `<div class="no-results-wrapper">
            <img src="/assets/illustrations/noresults.svg" class="img-fluid noresults" alt="no results found">
          </div>`
            var output = Mustache.render(template);
            $("#jobs-page .job-page-body").html(output);
        }else{
            renderJobs(response.data.items)
        }
        
    }).catch(function (error) {
            console.log(error);
    });
})

$(document).on("click", "#job-filter-modal .m-search-filter-modal", function(){
    title = $(this).parent().find("#m-job-title").val();
    type = $(this).parent().find("#m-type-dropdown").val();
    loc = $(this).parent().find("#m-location").val();
    page = 1
    //console.log(title, type, location)
    axios.post('/getjobs', {
        title, 
        type, 
        location:loc,
        page
        
    }).then(function (response) {
        console.log("success")
        if(response.data.error){
            template = `<div class="no-results-wrapper">
            <img src="/assets/illustrations/noresults.svg" class="img-fluid noresults" alt="no results found">
          </div>`
            var output = Mustache.render(template);
            $("#jobs-page .job-page-body").html(output);
        }else{
            renderJobs(response.data.items)
        }
        
    }).catch(function (error) {
            console.log(error);
    });
})

const renderJobs = (jobs)=>{
    for(var i =0;i<jobs.length; i++){
        if(!jobs[i].companyLogo){
            jobs[i].companyLogo = "/assets/logos/company.svg"
        }
    }
    view = {
        jobs
    }
    template = `
    {{#jobs}}
    <div class="col-md-6 col-lg-4 job-card-wrapper">
        <div class="job-card internship">
            <div class="top-grid">  
                <img src="{{companyLogo}}" alt="" class="img-fluid company-logo">
            
                <div class="company-name">{{companyName}}</div>
                <div class="locations">{{locations}}</div>
            </div>
            <div class="bottom-grid">
                <div class="job-title">{{title}}</div>
                <span class="job-type">{{jobType}}</span>
                <a class="btn apply-now-btn" href="{{jobUrl}}">Apply now</a>
            </div>
        </div>
    </div>
    {{/jobs}} `
    var output = Mustache.render(template, view);
    $("#jobs-page .job-page-body .job-cards").html(output);
}


// Load more button


$(document).on("click", "#jobs-page .job-page-body .load-more-btn", function(){
    page = page + 1
    console.log(title, type, loc, page)
    axios.post('/getjobs', {
        title, 
        type, 
        loc,
        page
        
    }).then(function (response) {
        console.log("success")
        if(response.data.error){
            template = `<div class="no-results-wrapper">
            <img src="/assets/illustrations/noresults.svg" class="img-fluid noresults" alt="no results found">
          </div>`
            var output = Mustache.render(template);
            $("#jobs-page .job-page-body").html(output);
        }else{
            var jobs = response.data.items
            for(var i =0;i<jobs.length; i++){
                if(!jobs[i].companyLogo){
                    jobs[i].companyLogo = "/assets/logos/company.svg"
                }
            }
            view = {
                jobs
            }
            template = `
            {{#jobs}}
            <div class="col-md-6 col-lg-4 job-card-wrapper">
                <div class="job-card internship">
                    <div class="top-grid">  
                        <img src="{{companyLogo}}" alt="" class="img-fluid company-logo">
                    
                        <div class="company-name">{{companyName}}</div>
                        <div class="locations">{{locations}}</div>
                    </div>
                    <div class="bottom-grid">
                        <div class="job-title">{{title}}</div>
                        <span class="job-type">{{jobType}}</span>
                        <a class="btn apply-now-btn" href="{{jobUrl}}">Apply now</a>
                    </div>
                </div>
            </div>
            {{/jobs}} `
            var output = Mustache.render(template, view);
            $("#jobs-page .job-page-body .job-cards").append(output);

                console.log(page , response.data.pagination.totalPages)
            if(page === response.data.pagination.totalPages ){
                alert("no more results")
            }
        }
        
    }).catch(function (error) {
            console.log(error);
    });
})




// ==================================================
// Mentors Page
// ==================================================
$(document).ready(function () {
	$("#mentors-page .web-filter .college-name-input").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        console.log(value);
		$("#mentors-page .mentor-card-wrapper").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});