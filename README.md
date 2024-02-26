Bootstrap-Form-Builder-V3V4
==========================

A bootstrap 3.0 form drag and drop builder, implemented in Jquery.  Based on:  https://github.com/minikomi/Bootstrap-Form-Builder


Avaialble Demo at:
http://formbuilder.tdjangoy.webfactional.com/

pyscripts folder has a simple Flask server to host the DEMO app. 
#### Runing the Demo locally::

##### Using Flask:
	
	$ cd <your_repo_path>/pyscripts
	$ python flask_app.py 
  
For more detail on Flask, see: http://flask.pocoo.org/

##### Using NPX and http-server

If you prefer not to use Flask or need a simple static server, you can use http-server through npx:

	$ cd <your_repo_path>
  $ npm run build
	$ npx http-server ./ -p 8080 

This will serve the project at http://localhost:8080. Navigate to this URL in your web browser to view the demo.


### New development on 2017-08-14

Added in two-column layout support. Click 'Select Form Layout' to choose 2-column form layout.

TODO/Limitations:
  * Now only support two columns layout
  * The two widgets in the same row have to be of the same height (otherwise you will see misalign-ment). We are actively working to fix it.


### WIP: Better 2-column layout support, V4 Support

Bootstrap V4 formbuilder demo:
http://formbuilder-v4.tdjangoy.webfactional.com/
