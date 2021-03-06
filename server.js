var express =require( 'express' ),
	http =require( 'http' ),
	path =require( 'path' ),
	mongoose =require( 'mongoose' ),
	bodyParser =require( 'body-parser' ),
	app =express(),
	port =process.env.PORT ||3000;
//set config
app.set( 'views',path.join( __dirname,'app/views' ) );
app.set( 'view engine','ejs' );

// mongoose.connect( 'mongodb://127.0.0.1/onlineRegistrationSystem' );
//database
var curriculums = mongoose.model('curriculums', require('./app/models/curriculums.js'));
var assestments = mongoose.model('assestments', require('./app/models/assestments.js'));

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );

//define routes
var administrator =require( './app/routes/administrator.js' ),
	curriculum =require( './app/routes/curriculum.js' );
	curriculumSettings =require( './app/routes/curriculumSettings.js' ),
	evaluator =require( './app/routes/evaluator.js' ),
	studentInfo =require( './app/routes/studentInfo.js' ),
	findCourse =require( './app/routes/findCourse.js' ),
	programCoordinator =require( './app/routes/programCoordinator.js' ),
	setSchedule =require( './app/routes/setSchedule.js' ),
	courseSubjects =require( './app/routes/courseSubjects.js' ),
	recSubjects =require( './app/routes/recSubjects.js' );

// page url
//for admin
app.use( '/administrator',administrator );
app.use( '/administrator/curriculum',curriculum );
app.use( '/administrator/curriculum/settings',curriculumSettings );
app.use( '/administrator/curriculum/course-subjects',courseSubjects );
//for staff
app.use( '/evaluator',evaluator );
app.use( '/program-coordinator',programCoordinator );
app.use( '/program-coordinator/set-schedule',setSchedule );

//evaluator
app.use( '/student-info',studentInfo );
app.use( '/school-courses',findCourse );
app.use( '/subjects-recommended',recSubjects );


app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/assestment',function ( req,res ) {

    assestments.find( {},function ( err,data ) {

        res.json( data );

    } );

} );

var new_assest = new assestments({
	typeOfFee: 'Misceleneous',
    fees:[
    	{
    		fee_name: 'libarary',
		    amount: 2000,
		    date_created: 7-04-15
    	},
    	{
    		fee_name: 'equipments',
		    amount: 3000,
		    date_created: 7-04-15
    	}
    ],
    keywords:["libarary"] 
})
// new_assest.save(function(err,data){
	
// });
//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
