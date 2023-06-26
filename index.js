const express = require('express');
const { exec } = require("child_process");
const { stdout, stderr } = require('process');


const app = express();



app.get("/", (req, res) => {
  res.sendFile(__dirname + '/container.html');
  // res.send("hi");
});

app.get("/run", (req, res) => {
  const cname = req.query.cname;
  const cimage = req.query.cimage;
  // console.log(cname +" "+cimage);
  //    res.send(cname+" "+cimage);
  exec(`docker run -dit --name ${cname} ${cimage}`, (err, stdout, stderr) => {
    // console.log(stdout);
    res.send("<pre>" + stdout + "</pre>");
  })
});

app.get("/ps", (req, res) => {
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
  exec("docker ps | tail -n +2", (err, stdout, stderr) => {
    let a = stdout.split("\n");
     let alength = a.length;

    res.write("<table border='2px' align='center' width='100%'>");
    res.write("<tr> <th>CONTAINER ID</th><th>IMAGE</th><th>COMMAND</th><th>CREATED</th><th>STATUS</th><th>NAME</th></tr>");
    a.forEach((cdetail,index) => {
     if(index<alength-1) {cinfo = cdetail.trim().split(/\s+/);
      //  console.log(cinfo[2]);
      res.write("<tr>" + " <td>" + cinfo[0] + "</td> " + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" + "<td>" + cinfo[3] + " " + cinfo[4] + " " + cinfo[5] + "</td>" + "<td>" + cinfo[6] + " " + cinfo[7] + " " + cinfo[8] + "</td>" + "<td>" + cinfo[9] + "</td>" + "</tr>")
      } 
    });
    res.write("</table>");
    res.send();
  })
  // res.send();
})
app.get("/psa", (req, res) => {
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
  exec("docker ps -a| tail -n +2", (err, stdout, stderr) => {
    // console.log(stdout);
    let a = stdout.split("\n");
     let alength = a.length;
    // console.log("a element"+alength); 
    res.write("<table border='2px' align='center' width='100%'>");
    res.write("<tr> <th>CONTAINER ID</th><th>IMAGE</th><th>COMMAND</th><th>CREATED</th><th>STATUS</th><th>NAME</th></tr>");
    a.forEach((cdetail, index) => {
      //  console.log(index);
      if (index < alength - 1) {
        cinfo = cdetail.trim().split(/\s+/);
        clength = cinfo.length;
        // console.log(clength);
        if(clength == 10){
          res.write("<tr>" + " <td>" + cinfo[0] + "</td> " + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" + "<td>" + cinfo[3] + " " + cinfo[4] + " " + cinfo[5] + "</td>" + "<td>" + " "+cinfo[clength-4] + " " + cinfo[clength-3] + " " + cinfo[clength-2] + "</td>" + "<td>" + cinfo[clength-1] + "</td>" + "</tr>")
        }
        else{
           res.write("<tr>" + " <td>" + cinfo[0] + "</td> " + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" + "<td>" + cinfo[3] + " " + cinfo[4] + " " + cinfo[5] + "</td>" + "<td>" + " " + cinfo[clength-6] + " " + cinfo[clength-5] +" "+cinfo[clength-4] + " " + cinfo[clength-3] + " " + cinfo[clength-2] + "</td>" + "<td>" + cinfo[clength-1] + "</td>" + "</tr>")
            }
      }
    });
    res.write("</table>");
    res.send();
  })
  // res.send();
})
app.get("/psid", (req, res) => {
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
  exec("docker ps -a -q", (err, stdout, stderr) => {
    let a = stdout.split("\n");
    res.write("<table border='2px solid black' align='center' width='15%'");
    res.write("<tr align='center'> <th align='center'>CONTAINER ID</th></tr>");
    a.forEach((cinfo) => {
      //  cinfo = cdetail.trim().split(/\s+/);
      //  console.log(cinfo[2]);
      res.write("<tr>" + " <td>" + cinfo + "</td> " + "</tr>")
    });
    res.write("</table>");
    res.send();
  })
  // res.send();
})
app.get("/psr", (req, res) => {
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
  exec("docker rm -f $(docker ps -a -q)", (err, stdout, stderr) => {
    let a = stdout.split("\n");
    res.write("<table border='2px' align='center' width='15%'");
    res.write("<tr align='center'> <th align='center'>CONTAINER ID</th></tr>");
    a.forEach((cinfo) => {
      //  cinfo = cdetail.trim().split(/\s+/);
      //  console.log(cinfo);
      res.write("<tr>" + " <td>" + cinfo + "</td> " + "</tr>")
    });
    res.write("</table>");
    res.send();
  })
  // res.send();
})
app.get("/pss", (req, res) => {
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
  exec("docker stop $(docker ps  -q)", (err, stdout, stderr) => {
    let a = stdout.split("\n");
    res.write("<table border='2px' align='center' width='8%'");
    res.write("<tr> <th>CONTAINER ID</th></tr>");
    a.forEach((cinfo) => {
      //  cinfo = cdetail.trim().split(/\s+/);
      //  console.log(cinfo);
      res.write("<tr>" + " <td>" + cinfo + "</td> " + "</tr>")
    });
    res.write("</table>");
    res.send();
  })
  // res.send();
})
app.get("/search", (req, res) => {
  const cimage = req.query.cimage;
  // console.log(cimage);
  exec(`docker images | grep ${cimage}`, (err, stdout, stderr) => {
    // console.log(stdout);
    if (stdout == "") {
      stdout = cimage + " image not found";
    }
    res.send("<pre>" + stdout + "</pre>");
  })
});

app.get("/rename", (req, res) => {
  const ceename = req.query.cname;
  const cnnname = req.query.cimage;
  // console.log(ceename +" "+cnnname);
  //    res.send(cname+" "+cimage);
  exec(`docker rename ${ceename} ${cnnname}`, (err, stdout, stderr) => {
    // console.log(stdout);
    if(!stderr){
      stdout = "Container name change " + ceename + "----->"+cnnname;
    }
    else{
      stdout = "Some name is wrong(or already taken by someone) plz try again";
    }
    res.send("<pre>" + stdout + "</pre>");
  })
});


app.get("/environment",(req,res)=>{
   res.sendFile(__dirname+"/environment.html");
});


app.get("/save", (req, res) => {
  const oname = req.query.cname;
  const iname = req.query.cimage;
  // console.log(ceename +" "+cnnname);
  //    res.send(cname+" "+cimage);
  exec(`docker commit ${oname} ${iname}`, (err, stdout, stderr) => {
    // console.log(stdout);
    res.send("<pre>" + stdout + "</pre>");
   })

   
  });

  
  app.get("/download/:filename",(req,res)=>{
    //     res.send("hi");
    //     console.log(req.params.filename);
    const fname = req.params.filename.slice(1);
    // console.log(fname);
    const filepath = __dirname + "/resource/"+fname+".txt";
    // console.log(filepath);
    res.download(
      filepath,
      "downloaded-enemyship.png",
      (err)=>{
        if(err) { res.send({
          error:err,
          msg:"Problem downloding the file"
        });}
      });
      
    });
     
    app.get("/image", (req, res) => {
      const ooname = req.query.cname;
      const iiname = req.query.cimage;
      // console.log(ceename +" "+cnnname);
      //    res.send(cname+" "+cimage);
      exec(`docker save ${ooname}:latest ${iiname} -o ao.tar`, (err, stdout, stderr) => {
        // console.log(stdout);
      res.send("<pre>" + stdout + "</pre>");
  
       })
    
      });

      app.get("/listimage", (req, res) => {
        //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
        //     console.log(stdout);
        //     res.send("<pre>"+stdout+"</pre>");
        exec("docker images", (err, stdout, stderr) => {
          
          res.send("<pre>"+stdout+"</pre>");
        })
        // res.send();
      })

app.listen(3000, () => { console.log("Container app tool started .....") });

//http://localhost:3000/run?cname=os8&cimage=ubuntu  `localhost:3000/run?cname=${cn}&cimage=ubuntu`

//    CONTAINER ID	IMAGE	COMMAND	CREATED	STATUS	NAME\nf423d73a938e 	ubuntu	"bash"	2 seconds ago	Up 1 second	os2\ned752d78879d 	ubuntu	"bash"	33 minutes ago	Up 33 minutes	os1

//CONTAINER ID	IMAGE	COMMAND	CREATED	STATUS	NAME,0
//f423d73a938e 	ubuntu	"bash"	2 seconds ago	Up 1 second	os2,1
//ed752d78879d 	ubuntu	"bash"	33 minutes ago	Up 33 minutes	os1  2


//f423d73a938e    	ubuntu	"bash"	2 seconds ago	Up 1 second	os2,1   split(" ")
//f423d73a938e cinfo[0]
//ubuntu cinfo[1]
//"bash" 
//2 
//seconds 
//ago	
//Up 
//1 
//second	
//os2,
