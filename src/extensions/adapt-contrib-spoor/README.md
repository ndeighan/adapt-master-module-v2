# adapt-contrib-spoor  

**Spoor** is an *extension* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  

This extension provides course tracking functionality (hence the name). Currently it only officially supports tracking to [SCORM](https://en.wikipedia.org/wiki/Sharable_Content_Object_Reference_Model) 1.2 [Learning Management Systems (LMS)](https://en.wikipedia.org/wiki/Learning_management_system), however, experienced users should be able to implement SCORM 2004 should this be needed as the underlying code is almost entirely version-agnostic (it's the packaging part you'll need to do yourself).

**Spoor** makes use of the excellent [pipwerks SCORM API Wrapper](https://github.com/pipwerks/scorm-api-wrapper/).

[Visit the **Spoor** wiki](https://github.com/adaptlearning/adapt-contrib-spoor/wiki) for more information about its functionality and for explanations of key properties.  

## Installation

As one of Adapt's *[core extensions](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#extensions),* **Spoor** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Spoor** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-contrib-spoor`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-spoor": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Spoor** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  
<div float align=right><a href="#top">Back to Top</a></div>  

## Usage Instructions  
The following must be completed in no specific order:  
- [Edit the manifest file, *imsmanifest.xml*.](#edit-the-manifest-file)  
- [Add tracking IDs in *blocks.json*.](#add-tracking-ids)  
- [Configure *config.json*.](#configure-configjson)  

### Edit the manifest file
Edit the manifest file [*imsmanifest.xml*](https://github.com/adaptlearning/adapt-contrib-spoor/required/imsmanifest.xml) to contain information specific to your course.   

First, change the three instances of the course title (currently set to "Adapt SCORM") and the description (currently set to "Responsive SCORM generated by the Adapt Framework") as required.

Next, change the three identifiers ('adapt_manifest' and two instances of 'adapt_scorm') to be unique to your course. Any alphanumeric string that you know will not have already been used in a course on the LMS will be fine - for example '1234_manifest' and '1234_scorm'.

There are many other ways the manifest can be set up and populated to your advantage. A full explanation is beyond the scope of this README. For more information, reference the [SCORM 1.2 documentation](http://www.adlnet.gov/resources/scorm-1-2-specification/), specifically the SCORM Content Aggregation Model ([SCORM_1.2_CAM](http://www.adlnet.gov/wp-content/uploads/2013/09/SCORM_1.2_CAM.pdf)).

### Add tracking IDs  

Each block in *blocks.json* **must** include the following attribute:  
`"_trackingId": `  
Its value must be a unique number. There is no requirement that these values be sequential, but it is recommended as it can aid in debugging tracking issues if they are. Best practice begins the sequence of tracking IDs with `0`.  

An alternative to manually inserting the tracking IDs is to run the following grunt command. With your course root as the current working directory, run:  
`grunt tracking-insert`  
If later you add more blocks, run this again to assign tracking IDs to the new blocks. (`grunt tracking-insert` maintains a variable in *course.json* called `_latestTrackingId`. This variable is not used by **Spoor** itself, just by the grunt task.)  

<div float align=right><a href="#top">Back to Top</a></div>  

### Configure *config.json*  
The attributes listed below are used in *config.json* to configure **Spoor**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-spoor/blob/master/example.json). Visit the [**Spoor** wiki](https://github.com/adaptlearning/adapt-contrib-spoor/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki).  

#### Attributes

**_spoor**: (object): The Spoor object that contains values for **_isEnabled**, **_tracking**, **_reporting**, and **_advancedSettings**.
 
>**_isEnabled** (boolean): Enables/disables the **Spoor** extension. If set to `true` (the default value), the plugin will try to connect to a SCORM conformant LMS on course launch. If one is not available, a 'Could not connect to LMS' error message will be display. This error may be ignored, or it may be avoided entirely by setting this to `false`. Disabling tracking in this way can be very helpful during course development (when running the course from a local server rather than an LMS) or if you have a course that needs to be able to run on an LMS or a web server.

>**_tracking** (object): This object contains values for **_requireCourseCompleted**, **_requireAssessmentPassed**, **_shouldSubmitScore**.  

>>**_requireCourseCompleted** (boolean): Determines whether the learner must complete all the components in the course before the course can be marked as finished in the LMS. Acceptable values are `true` or `false`. The default is `true`.    

>>**_requireAssessmentPassed** (boolean): Determines whether the user must pass the course assessment, not simply complete it, before the course can be marked as finished in the LMS. Acceptable values are `true` or `false`. The default is `false`.  If this attribute and `_requireCourseCompleted` are both set to `true`, the learner must pass the course assessment as well as complete all components in order for the course can be marked as finished in the LMS.

>>**_shouldSubmitScore** (boolean): Determines whether the numeric scores attained in assessments will be reported to the LMS. Acceptable values are `true` or `false`.  
		
>**_reporting** (object): This object defines what status to report back to the LMS. Contains values for **_onTrackingCriteriaMet**, **_onAssessmentFailure**.  

>>**_onTrackingCriteriaMet** (string): Specifies the status that is reported to the LMS when the tracking criteria are met. Acceptable values are: `"completed"`, `"passed"`, `"failed"`, and `"incomplete"`. If you are tracking a course by assessment, you would typically set this to `"passed"`. Otherwise, `"completed"` is the usual value.

>>**_onAssessmentFailure** (string): Specifies the status that is reported to the LMS when the assessment is failed. Acceptable values are `"failed"` and `"incomplete"`. Some Learning Management Systems will prevent the user from making further attempts at the course after status has been set to `"failed"`. Therefore, it is common to set this to `"incomplete"` to allow the user more attempts to pass an assessment.  

>**_advancedSettings** (object): The advance settings attribute group contains values for **_scormVersion**, **_showDebugWindow**, **_commitOnStatusChange**, **_timedCommitFrequency**, **_maxCommitRetries**, and **_commitRetryDelay**.

>>**_scormVersion** (string): This text defines what version of SCORM is targeted. Only SCORM 1.2 is officially supported by Adapt. SCORM 2004 should work, but Adapt doesn't include this version in testing. To enable SCORM 2004 support, change this value to `"2004"` and include the relevant SCORM 2004 packaging files (*imsmanifest.xml* and others). The default is `"1.2"`.  

>>**_showDebugWindow** (boolean): If set to `true`, a pop-up window will be shown on course launch that gives detailed information about what SCORM calls are being made. This can be very useful for debugging SCORM issues. Note that this pop-up window will appear automatically if the SCORM code encounters an error, even if this is set to `false`. The default is `false`.  

>>**_commitOnStatusChange** (boolean): Determines whether a "commit" call should be made automatically every time the SCORM *lesson_status* is changed. The default is `true`.  

>>**_timedCommitFrequency** (number): Specifies the frequency - in minutes - at which a "commit" call will be made. Set this value to `0` to disable automatic commits. The default is `10`.  

>>**_maxCommitRetries** (number): If a "commit" call fails, this setting specifies how many more times the "commit" call will be attempted before giving up and throwing an error. The default is `5`.  

>>**_commitRetryDelay** (number): Specifies the interval in milliseconds between commit retries. The default is `2000`.

<div float align=right><a href="#top">Back to Top</a></div>  

###Running a course without tracking while Spoor is installed  
- Use *main.html* instead of *index.html*.  
*OR*  
- Set `"_isEnabled": false` in *config.json*.

###Client Local Storage / Fake LMS / Adapt LMS Behaviour Testing
When **Spoor** is installed, *scorm_test_harness.html* can be used instead of *index.html* to allow the browser to store LMS states inside a browser cookie. This allows developer to test LMS specified behaviour outside of an LMS environment.

## Limitations
 
Currently (officially) only supports SCORM 1.2  

----------------------------
**Version number:**  2.0   <a href="https://community.adaptlearning.org/ target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a> 
**Framework versions:**  2.0     
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-spoor/graphs/contributors) 
**Accessibility support:** n/a   
**RTL support:** n/a  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 7+8), Safari for iPad (iOS 7+8), Safari 8, Opera    
