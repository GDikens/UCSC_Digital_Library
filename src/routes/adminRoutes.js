var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    { 
        title : 'Unlocking Android', 
        isbn : '1933988673', 
        pageCount : 416,
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg', 
        shortDescription : "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
        authors : 'W. Frank Ableson'
    },
    { 
        title : 'Android in Action, Second Edition', 
        isbn : '1935182722', 
        pageCount : 592, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg', 
        shortDescription : "Android in Action, Second Edition is a comprehensive tutorial for Android developers. Taking you far beyond \"Hello Android,\" this fast-paced book puts you in the driver's seat as you learn important architectural concepts and implementation strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in features by building useful and intriguing examples. ", 
        authors : 'W. Frank Ableson'
    },
    { 
        title : 'Specification by Example', 
        isbn : '1617290084', 
        pageCount : 0, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg',
        shortDescription : "There's a great deal of wisdom in a crowd, but how do you listen to a thousand people talking at once  Identifying the wants, needs, and knowledge of internet users can be like listening to a mob.    In the Web 2.0 era, leveraging the collective power of user contributions, interactions, and feedback is the key to market dominance. A new category of powerful programming techniques lets you discover the patterns, inter-relationships, and individual profiles   the collective intelligence   locked in the data people leave behind as they surf websites, post blogs, and interact with other users.    Collective Intelligence in Action is a hands-on guidebook for implementing collective-intelligence concepts using Java. It is the first Java-based book to emphasize the underlying algorithms and technical implementation of vital data gathering and mining techniques like analyzing trends, discovering relationships, and making predictions. It provides a pragmatic approach to personalization by combining content-based analysis with collaborative approaches.    This book is for Java developers implementing collective intelligence in real, high-use applications. Following a running example in which you harvest and use information from blogs, you learn to develop software that you can embed in your own applications. The code examples are immediately reusable and give the Java developer a working collective intelligence toolkit.    Along the way, you work with, a number of APIs and open-source toolkits including text analysis and search using Lucene, web-crawling using Nutch, and applying machine learning algorithms using WEKA and the Java Data Mining (JDM) standard.",  
        authors : 'Gojko Adzic' 
    },
    { 
        title : "Flex 3 in Action", 
        isbn : "1933988746", 
        pageCount : 576, 
        thumbnailUrl : "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed.jpg", 
        shortDescription : "New web applications require engaging user-friendly interfaces   and the cooler, the better. With Flex 3, web developers at any skill level can create high-quality, effective, and interactive Rich Internet Applications (RIAs) quickly and easily. Flex removes the complexity barrier from RIA development by offering sophisticated tools and a straightforward programming language so you can focus on what you want to do instead of how to do it. And now that the major components of Flex are free and open-source, the cost barrier is gone, as well!    Flex 3 in Action is an easy-to-follow, hands-on Flex tutorial. Chock-full of examples, this book goes beyond feature coverage and helps you put Flex to work in real day-to-day tasks. You'll quickly master the Flex API and learn to apply the techniques that make your Flex applications stand out from the crowd.    Interesting themes, styles, and skins  It's in there.  Working with databases  You got it.  Interactive forms and validation  You bet.  Charting techniques to help you visualize data  Bam!  The expert authors of Flex 3 in Action have one goal   to help you get down to business with Flex 3. Fast.    Many Flex books are overwhelming to new users   focusing on the complexities of the language and the super-specialized subjects in the Flex eco-system; Flex 3 in Action filters out the noise and dives into the core topics you need every day. Using numerous easy-to-understand examples, Flex 3 in Action gives you a strong foundation that you can build on as the complexity of your projects increases.", 
        authors : 'Tariq Ahmed with Jon Hirschi'
    },
    { 
        title : "Flex 4 in Action", 
        isbn : "1935182420", 
        pageCount : 600,  
        thumbnailUrl : "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed2.jpg", 
        shortDescription : "Using Flex, you can create high-quality, effective, and interactive Rich Internet Applications (RIAs) quickly and easily. Flex removes the complexity barrier from RIA development by offering sophisticated tools and a straightforward programming language so you can focus on what you want to do instead of how to do it. And the new features added in Flex 4 give you an even wider range of options!    Flex 4 in Action is an easy-to-follow, hands-on Flex tutorial that goes beyond feature coverage and helps you put Flex to work in real day-to-day tasks. You'll quickly master the Flex API and learn to apply the techniques that make your Flex applications stand out from the crowd.    The expert authors of Flex 4 in Action have one goal-to help you get down to business with Flex. Fast. Flex 4 in Action filters out the noise and dives into the core topics you need every day. Using numerous easy-to-understand examples, Flex 4 in Action gives you a strong foundation that you can build on as the complexity of your projects increases.    Interesting themes, styles, and skins  It's in there.  Working with databases  You got it.  Interactive forms and validation  You bet.  Charting techniques to help you visualize data  Bam!  And you'll get full coverage of these great Flex 4 upgrades:  Next generation Spark components-New buttons, form inputs, navigation controls and other visual components replace the Flex 3 \"Halo\" versions. Spark components are easier to customize, which makes skinning and theme design much faster  A new \"network monitor\" allows you to see the data communications between a Flex application and a backend server, which helps when trying to debug applications that are communicating to another system/service  Numerous productivity boosting features that speed up the process of creating applications  A faster compiler to take your human-written source code and convert it into a machine-readable format  Built-in support for unit testing allows you to improve the quality of your software, and reduce the time spent in testing", 
        authors : 'Tariq Ahmed' 
    },
    { 
        title : "Collective Intelligence in Action", 
        isbn : "1933988312", 
        pageCount : 425, 
        thumbnailUrl : "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/alag.jpg", 
        shortDescription : "There's a great deal of wisdom in a crowd, but how do you listen to a thousand people talking at once  Identifying the wants, needs, and knowledge of internet users can be like listening to a mob.    In the Web 2.0 era, leveraging the collective power of user contributions, interactions, and feedback is the key to market dominance. A new category of powerful programming techniques lets you discover the patterns, inter-relationships, and individual profiles   the collective intelligence   locked in the data people leave behind as they surf websites, post blogs, and interact with other users.    Collective Intelligence in Action is a hands-on guidebook for implementing collective-intelligence concepts using Java. It is the first Java-based book to emphasize the underlying algorithms and technical implementation of vital data gathering and mining techniques like analyzing trends, discovering relationships, and making predictions. It provides a pragmatic approach to personalization by combining content-based analysis with collaborative approaches.    This book is for Java developers implementing collective intelligence in real, high-use applications. Following a running example in which you harvest and use information from blogs, you learn to develop software that you can embed in your own applications. The code examples are immediately reusable and give the Java developer a working collective intelligence toolkit.    Along the way, you work with, a number of APIs and open-source toolkits including text analysis and search using Lucene, web-crawling using Nutch, and applying machine learning algorithms using WEKA and the Java Data Mining (JDM) standard.", 
        authors : 'Satnam Alag'
    },
    { 
        title : 'Zend Framework in Action', 
        isbn : '1933988320', 
        pageCount : 432, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allen.jpg', 
        shortDescription : 'Zend Framework in Action is a comprehensive tutorial that shows how to use the Zend Framework to create web-based applications and web services. This book takes you on an over-the-shoulder tour of the components of the Zend Framework as you build a high quality, real-world web application.',
        authors : 'Rob Allen'
    },
    { 
        title : 'Flex on Java', 
        isbn : '1933988797', 
        pageCount : 265, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg', 
        shortDescription : "A beautifully written book that is a must have for every Java Developer. Ashish Kulkarni, Technical Director, E-Business Software Solutions Ltd.",  
        authors : 'Bernerd Allmon'
    },
    { 
        title : 'Griffon in Action', 
        isbn : '1935182234', 
        pageCount : 375, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/almiray.jpg', 
        shortDescription : "Griffon in Action is a comprehensive tutorial written for Java developers who want a more productive approach to UI development. In this book, you'll immediately dive into Griffon. After a Griffon orientation and a quick Groovy tutorial, you'll start building examples that explore Griffon's high productivity approach to Swing development. One of the troublesome parts of Swing development is the amount of Java code that is required to get a simple application off the ground.", 
        authors : 'Andres Almiray'
    },
    {  
        title : 'OSGi in Depth', 
        isbn : '193518217X', 
        pageCount : 325, 
        thumbnailUrl : 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/alves.jpg', 
        shortDescription : 'Enterprise OSGi shows a Java developer how to develop to the OSGi Service Platform Enterprise specification, an emerging Java-based technology for developing modular enterprise applications. Enterprise OSGi addresses several shortcomings of existing enterprise platforms, such as allowing the creation of better maintainable and extensible applications, and provide a simpler, easier-to-use, light-weight solution to enterprise software development.', 
        authors : 'Alexandre de Castro Alves'
    }
    
];

var authors = [
    {
        author:'W. Frank Ableson'
    },
    {
        author:'Gojko Adzic'
    },
    {
        author:'Tariq Ahmed'
    },
    {
        author:'Jon Hirschi'
    },
    {
        author:'Satnam Alag'
    },
    {
        author:'Rob Allen'
    },
    {
        author:'Bernerd Allmon'
    },
    {
        author:'Andres Almiray'
    },
    {
        author:'Alexandre de Castro Alves'
    }
];

var router = function (nav){

    adminRouter.route('/addBooks')
        .get(function(req,res){
            var url = 'mongodb://localhost:27017/ucscdigitallibrary';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err,results){
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });

    adminRouter.route('/addAuthors')
        .get(function(req,res){
            var url = 'mongodb://localhost:27017/ucscdigitallibrary';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('authors');
                collection.insertMany(authors, function(err,results){
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;