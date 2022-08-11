const express = require('express');
const { exec } = require("child_process");
const { stdout, stderr } = require('process');


const app = express();



app.get("/",(req,res)=>{
  res.sendFile(__dirname+'/container.html');
    // res.send("hi");
});

app.get("/run",(req,res)=>{
    const cname = req.query.cname;
    const cimage= req.query.cimage;
      // console.log(cname +" "+cimage);
//    res.send(cname+" "+cimage);
     exec(`docker run -dit --name ${cname} ${cimage}` ,(err,stdout,stderr)=>{
        console.log(stdout);
        res.send("<pre>"+stdout+"</pre>");
     })
});
app.get("/ps",(req,res)=>{
//   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
//     console.log(stdout);
//     res.send("<pre>"+stdout+"</pre>");
    exec("docker ps | tail -n +2",(err,stdout,stderr)=>{
    let a = stdout.split("\n");
     res.write("<table border='5' align='center' width='100%'>");
     res.write("<tr> <th>CONTAINER ID</th><th>IMAGE</th><th>COMMAND</th><th>CREATED</th><th>STATUS</th><th>NAME</th>");  
     a.forEach((cdetail) => {
         cinfo = cdetail.trim().split(/\s+/);
        //  console.log(cinfo[2]);
         res.write("<tr>"+" <td>"+cinfo[0]+"</td> "+"<td>"+cinfo[1]+"</td>"+"<td>"+cinfo[2]+"</td>"+"<td>"+cinfo[3]+" "+cinfo[4]+" "+cinfo[5]+"</td>"+"<td>"+cinfo[6]+" "+cinfo[7]+" "+cinfo[8]+"</td>"+"<td>"+cinfo[9]+"</td>"+"</tr>")
     });
       res.write("</table>");
       res.send();
    })
    // res.send();
})

//function to remove all the containers
app.get("/psr",(req,res)=>{
  //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
  //     console.log(stdout);
  //     res.send("<pre>"+stdout+"</pre>");
      exec("docker rm -f $(docker ps -a -q)",(err,stdout,stderr)=>{
      let a = stdout.split("\n");
       res.write("<table border='5px' align='center' width='8%'");
       res.write("<tr> <th>CONTAINER ID</th></tr>");  
       a.forEach((cinfo) => {
          //  cinfo = cdetail.trim().split(/\s+/);
          //  console.log(cinfo);
           res.write("<tr>"+" <td>"+cinfo+"</td> "+"</tr>")
       });
         res.write("</table>");
         res.send();
      })
      // res.send();
  })

//function to check whether the particular image entered by user has been pulled or not.
app.get("/search",(req,res)=>{
    const cimage= req.query.cimage;
      // console.log(cname +" "+cimage);
//    res.send(cname+" "+cimage);
     exec(`docker images | grep ${cimage}` ,(err,stdout,stderr)=>{
        console.log(stdout);
           if(stdout==""){
             stdout = cimage+"image not found";
              }
        res.send("<pre>"+stdout+"</pre>");
     })
});
app.get("/psid",(req,res)=>{
    //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
    //     console.log(stdout);
    //     res.send("<pre>"+stdout+"</pre>");
        exec("docker ps -a -q",(err,stdout,stderr)=>{
        let a = stdout.split("\n");
         res.write("<table border='5px' align='center' width='8%'");
         res.write("<tr> <th>CONTAINER ID</th></tr>");  
         a.forEach((cinfo) => {
            //  cinfo = cdetail.trim().split(/\s+/);
            //  console.log(cinfo[2]);
             res.write("<tr>"+" <td>"+cinfo+"</td> "+"</tr>")
         });
           res.write("</table>");
           res.send();
        })
        // res.send();
    })
      app.get("/pss",(req,res)=>{
        //   exec("docker ps -a | tail -n +2 | awk '{print $2,$7, $10}'",(err,stdout,stderr)=>{
        //     console.log(stdout);
        //     res.send("<pre>"+stdout+"</pre>");
            exec("docker stop $(docker ps -a -q)",(err,stdout,stderr)=>{
            let a = stdout.split("\n");
             res.write("<table border='5px' align='center' width='8%'");
             res.write("<tr> <th>CONTAINER ID</th></tr>");  
             a.forEach((cinfo) => {
                //  cinfo = cdetail.trim().split(/\s+/);
                //  console.log(cinfo);
                 res.write("<tr>"+" <td>"+cinfo+"</td> "+"</tr>")
             });
               res.write("</table>");
               res.send();
            })
            // res.send();
        })  


app.listen(3000,()=>{console.log("Container app tool started .....")});

//http://localhost:3000/run?cname=os8&cimage=ubuntu  `localhost:3000/run?cname=${cn}&cimage=ubuntu`
