var player_color=[];
var game_active=false;
var active_player=1;
var gameboard = [];
player_color[1]="red";
player_color[2]="yellow";
var gamename;
var c;



function typeSubmitted(){
	document.getElementById("game_type").style.display="none";
	var x = document.getElementById("nplayers").value;
	if(x==1)difficult();
	else if(x==2)document.getElementById("onorof").style.display="block";
}



function twoPlayers(){
	document.getElementById("onorof").style.display="none";
	document.getElementById("two_players").style.display="block"; 
}


function difficult(){
		document.getElementById("difficult").style.display="block";
}

function callSizeon(){
		document.getElementById("onorof").style.display="none";
		document.getElementById("difficult").style.display="none";
		document.getElementById("two_players").style.display="none";
		document.getElementById("game_sizeon").style.display="block";
	}

function callSize(){
	document.getElementById("onorof").style.display="none";
	document.getElementById("difficult").style.display="none";
	document.getElementById("two_players").style.display="none";
	document.getElementById("game_size").style.display="block";
}

	







function tabuleiro(){
	console.log(1);
	document.getElementById("game_size").style.display="none";
	document.getElementById("game_info").style.display="block";
	console.log(2);
	document.getElementById("start").style.display="block";
	console.log(3);
	document.getElementById("caixa").style.display="inline-block";
	console.log(4);

	var linhas = document.getElementById("linhas").value;
	var colunas = document.getElementById("colunas").value;
	active_player = document.getElementById("order").value;

	console.log(linhas);
	console.log(colunas);


 	var tabuleiro = document.createElement("div");
 	tabuleiro.classList.add("tabuleiro");
 	for (let i=0;i<colunas;i++){
 		var coluna = document.createElement("div");
 		coluna.classList.add("coluna");
 		coluna.id="col_"+i;

 		

	 	for(let li=0;li<linhas;li++){
	 		var bloco = document.createElement("div");
	 		bloco.classList.add("bloco");
	 		bloco.id="bloco"+i+"_"+li;
	 		coluna.appendChild(bloco);
	 		tabuleiro.appendChild(coluna);

	
		}
		caixa.appendChild(tabuleiro);
		var type=document.getElementById("nplayers").value;
		if(type==1) active_player=1;
		coluna.onclick=function(){
			c=i;
			for(let j = linhas-1; j>=0; j--){
		if(gameboard[j][i]==0){
			gameboard[j][i] = active_player;
			if(type==2){
				if (active_player == 1) { active_player = 2; }
				else { active_player = 1; }
			}
			if(type==1)
				pcPlay();
			checkTurn();
			drawBoard();

			return;
		}
	}
}
		
	}
}

function pcPlay(){
	var linhas = document.getElementById("linhas").value;
	var colunas = document.getElementById("colunas").value;
	for(let i=linhas-1;i>=0;i--){
		for(let j=0;j<colunas;j++){
			if(gameboard[i][j]==0){
				gameboard[i][j]=2;
				return;
			}
		}
	}
}





	



function beginGame(){
	document.getElementById("start").style.display="none";
	var linhas = document.getElementById("linhas").value;
	var colunas = document.getElementById("colunas").value;
	if(game_active==true) return false;
	game_active=true;
	for(let row=0;row<linhas;row++){
		gameboard[row] = [];
		for(let col=0;col<colunas;col++){
			gameboard[row][col] = 0;
		}
	}
	drawBoard();
	checkTurn();
}

function drawBoard(){
	var linhas = document.getElementById("linhas").value;
	var colunas = document.getElementById("colunas").value;
	checkWin();
	for(let row=0;row<linhas;row++){
		for(let col=0;col<colunas;col++){
			if(gameboard[row][col]==1)
				document.getElementById("bloco"+col+"_"+row).style.backgroundColor = "red";
			else if(gameboard[row][col]==2)
				document.getElementById("bloco"+col+"_"+row).style.backgroundColor = "#FFFF00";
		}
	}
}

function checkWin(){
	var linhas = document.getElementById("linhas").value;
	var colunas = document.getElementById("colunas").value;

	for (i=1; i<=2; i++) {
					for (row = 0; row <linhas; row++) {
						for (col = 0; col <colunas-3; col++) {
							if (gameboard[row][col] == i) {
								if ((gameboard[row][col+1] == i) && (gameboard[row][col+2] == i) && (gameboard[row][col+3] == i)) {
									endGame(i);
									return true; 
								}
							}
						}
					}
				}
				
				for (i=1; i<=2; i++) {
					for (col = 0; col <colunas; col++) {
						for (row = 0; row <linhas-3; row++) {
							if (gameboard[row][col] == i) {
								if ((gameboard[row+1][col] == i) && (gameboard[row+2][col] == i) && (gameboard[row+3][col] == i)) {
									endGame(i); 
									return true; 
								}
							}
						}
					}
				}
		for (i=1; i<=2; i++) {
					for (col = 0; col <=colunas-3; col++) {
						for (row = 0; row <=linhas-3; row++) {
							if (gameboard[row][col] == i) {
								if ((gameboard[row+1][col+1] == i) && (gameboard[row+2][col+2] == i) && (gameboard[row+3][col+3] == i)) {
									endGame(i);
									return true;
								}
							}
						}
					}
				}
								
				//diagnol up
				for (i=1; i<=2; i++) {
					for (col = 0; col <=colunas-3; col++) {
						for (row = 3; row <=linhas-1; row++) {
							if (gameboard[row][col] == i) {
								if ((gameboard[row-1][col+1] == i) && (gameboard[row-2][col+2] == i) && (gameboard[row-3][col+3] == i)) {
									endGame(i);
									return true;
								}
							}
						}
					}
				}
			}



function checkTurn(){
	if(game_active) {
		document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
	}

}

function endGame(winner) {
    game_active = false; 
		document.getElementById('game_info').innerHTML = "Winner: " + winner; //set th
		document.getElementById("start").style.display = "none";
		document.getElementById("game_type").style.display = "none";
		document.getElementById("two_players").style.display = "none";
		document.getElementById("game_size").style.display = "none";
		document.getElementById("caixa").style.display = "none";
		document.getElementById("difficult").style.display = "none";
		document.getElementById("erro").style.display = "none";
    }


var url = "http://twserver.alunos.dcc.fc.up.pt:8008/";
var a = new XMLHttpRequest();
var gamename;
var turno=0;
var gameboardon=[];
var flag1=0;


  function join(){
    var user = document.getElementById("user").value;
    var passi = document.getElementById("pass").value;
    var linhas = document.getElementById("linhason").value;
	var colunas = document.getElementById("colunason").value;
    if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
    a.open("POST",url+"join",true);    
    var tamanho= { "rows": linhas, "columns": colunas };
    var objt = { "group": 18, "nick": user, "pass": passi, "size": {"rows": parseInt(linhas), "columns": parseInt(colunas)}};
    var stri =JSON.stringify(objt);

    a.onreadystatechange = function() {
      if(a.readyState ==4 && a.status == 200){
        var obj = JSON.parse(a.responseText);
        if(obj["erro"] == null){
          gamename = obj["game"];
          document.getElementById("desistir").style.display="block";
          console.log(gamename);
          update(user,gamename,linhas,colunas);
        }
        else
        alert(obj.error);
      }
    }
        a.send(stri); 

    
  }

 

function register(){
	var nick = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	var objt = {"nick": nick, "pass": pass};
	var json = JSON.stringify(objt);

	a.open("POST",url+ "register", true);

	a.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200 && this.status != 400) {	
			document.getElementById("area_login").style.display="none";
			document.getElementById("game_type").style.display="block";
		}

		else
			if(this.status==400){
			document.getElementById("erro").style.display = "block";}
	}	
	a.send(json);
	
}
  var COLUNA;
  var flag2=0;
  var oponente;
  var win;
  var turno;

 function update(user,game,col,l){
 	var passi = document.getElementById("pass").value;
    let event_source = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8008/update?nick="+user+"&game="+gamename);
    event_source.onmessage = function(event) {
      obj = JSON.parse(event.data);
      if(obj.winner!=null){
      	win=obj.winner;
      	document.getElementById("desistir").style.display="none";
      	document.getElementById("caixa").style.display="none";
		document.getElementById("voltar").style.display="block";
		document.getElementById('game_info').innerHTML = "Winner: " + obj.winner;      }

      if(obj.turn != null){
      	console.log(obj.turn);
      	var oponente=obj.turn;
      	 	 if(flag2==0){
      			turno=1;
        		tabuleiron(user,passi, oponente, l, Number(col), gamename)
        		flag2=1;
        		game_active=true;
        	}

      
        if(oponente!= user && flag2==1){
      	COLUNA = obj.column;
          turno=oponente;
          console.log("coluna:");
          console.log(obj.column);
          drawboardOn(user,oponente);
        }
        else if (flag2==1){
        	COLUNA = obj.column;
          	turno=user;
            console.log("coluna:");
          console.log(obj.column);
          drawboardOn(user, oponente);
        }
  	  }
    }
 }

                
 
 

 function notify(nick,pass,game,col, linhas){
  	let url_join = "http://twserver.alunos.dcc.fc.up.pt:8008/notify";
  	let data = 	{ "nick": nick, "pass": pass, "game": game, "column": col };
  	fetch(url_join, {
          method: "POST",
          body: JSON.stringify(data),
      })
      .then(function (response){
      if(!response.ok)
      alert("Ainda não é a sua vez de jogar");
      else
      update(nick,game,col,l);
  	})
  	.catch(error => {});
  }



function tabuleiron(nick,passi, oponente, linhas, colunas, game){
document.getElementById("game_sizeon").style.display="none";
document.getElementById("game_info").style.display="block";
document.getElementById("caixa").style.display="inline-block";

	console.log(linhas);
	console.log(colunas);

		
		var tabuleiro = document.createElement("div");
 		tabuleiro.classList.add("tabuleiro");
 	    for(var i=0; i<colunas; i++) { //nºcolunas
      		gameboardon[i]=[];
      		var coluna = document.createElement("div");
     		coluna.classList.add("coluna");
      		coluna.id=i; // id da coluna
      		for(var j=0; j<linhas; j++){
        		gameboardon[i][j]=-1;
        		var bloco = document.createElement("div");
        		bloco.classList.add("bloco");
        		bloco.id="bloco"+i+"_"+j;
        		coluna.appendChild(bloco);
        		tabuleiro.appendChild(coluna);
      		}
      		

      		caixa.appendChild(tabuleiro);
		coluna.onclick=function(){
			console.log("SPAM");
			//for(let j = linhas-1; j>=0; j--){
				/*let colx = this.id;
				if(gameboardon[colx][j]==-1) {
					gameboardon[colx][j]=active_player;
					console.log("Matriz:");
					console.log(gameboardon[colx][j]);
					break;
				}    
        	}*/
        			notify(nick, passi, game, this.id, linhas);
					return;
   		}

	}
}


function beginGameOn(nick,oponente, linhas, colunas, game){
	var linhas = document.getElementById("linhason").value;
	var colunas = document.getElementById("colunason").value;
	if(game_active==true) return false;
	game_active=true;
	for(let row=0;row<linhas;row++){
		gameboardon[row] = [];
		for(let col=0;col<colunas;col++){
			gameboardon[row][col] = -1;
		}
	}
	checkTurnOn(nick, oponente);
}

function checkTurnOn(user,oponente){
	console.log(user);
	console.log(oponente);
		if(game_active) {
			if(active_player==1){
				document.getElementById('game_info').innerHTML = "Current Player: Player " + 1 + " <span class='player"+1+"'>(" + player_color[1] + ")</span>";}
			else if(active_playerERRROOOOOOuser){
				document.getElementById('game_info').innerHTML = "Current Player: Player " + 2+ " <span class='player"+2+"'>(" + player_color[2] + ")</span>";}
			}
	}

function displayrank(){
	document.getElementById("area_login").style.display="none";
	document.getElementById("rankingpage").style.display="block";
	document.getElementById("hiderank").style.display="block";
}
function drawboardOn(user,oponente) {
  var nick = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;  
  var linhas = document.getElementById("linhason").value;
  var colunas = document.getElementById("colunason").value;
    console.log("ativo:");
    console.log(turno);
    if(COLUNA!=null){
    for(var row=linhas-1;row>=0;row--){
        console.log("chegou ao drawboard");
    if(gameboardon[COLUNA][row]==-1) {
      console.log("tamanho");
      if(turno==1){
    document.getElementById("bloco"+COLUNA+"_"+row).style.backgroundColor = "red";}
    if(turno==2) document.getElementById("bloco"+COLUNA+"_"+row).style.backgroundColor = "#FFFF00";
    gameboardon[COLUNA][row]=1;
    break;
  }
}
}
    }
    
 
function leave(){
    var user = document.getElementById("user").value;
    var passi = document.getElementById("pass").value;
    var linhas= document.getElementById("linhason").value;
    var colunas= document.getElementById("linhason").value;

    console.log(user+"user");
    console.log(passi+"passw");
    console.log(gamename);
	  var obj = {
    "nick": user,
    "pass": passi,
    "game": gamename
  }
   fetch(url + "leave", {
    method: "POST",
    body: JSON.stringify(obj),
  }).then(function(response) {
    if (response.ok) {
		update(user,gamename,linhas,colunas);
	}
	 else {
      console.log('erro:-' + response.statusText);
    }
  })
}

function ranking(){
	if(flag1==1){
		clearBox("tabela_rank");	
	}
  var l = document.getElementById("linhasr").value;
  var c = document.getElementById("colunasr").value;
    a.open("POST",url+"ranking", true);
    console.log(JSON.stringify({"size": {"rows": parseInt(l), "columns": parseInt(c)  }}));
    var obj= JSON.stringify({"size": {"rows": parseInt(l), "columns": parseInt(c) }})
    a.send(obj);
    a.onreadystatechange = function () {
      if (a.readyState != 4) { return; }
      if (a.status != 200) {
        if(a.responseText == '{"error":"Invalid size"}'){
          alert("Tamanho Invalido");
        }
        if(a.responseText == '{"error":"Undefined size"}'){
          alert("Tamanho Invalido");
        }
      }
      else{
        if(a.responseText == "{}"){
          alert("Valores ainda indefinidos");
        }
        else{
        	  console.log(a.responseText);
          var tabela= document.createElement("table");
          tabela.id = "tabela";
          tabela.setAttribute("nick","vitorias","numerojogos");
          tabela.border="5";
          var header = tabela.createTHead();
          header.id ="head";
          var row = header.insertRow(0);
          var cell = row.insertCell(0);
          cell.innerHTML = "Nick";
          var cell = row.insertCell(1);
          cell.innerHTML = "Vitorias";
          var cell = row.insertCell(2);
          cell.innerHTML = "Numero Jogos";

          for (var k = 0; k < 10 && k<JSON.parse(a.responseText).ranking.length; k++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 3; j++){
              var td = document.createElement('td');
              switch(j){
                case 0: {
                  td.appendChild(document.createTextNode(JSON.parse(a.responseText).ranking[k].nick));
                  if(k==0)
                  td.id ="rank0";
                  if(k==1)
                  td.id ="rank1";
                  if(k==2)
                  td.id ="rank2";
                }
                break;
                case 1:{
                  td.appendChild(document.createTextNode(JSON.parse(a.responseText).ranking[k].victories));
                  if(k==0)
                  td.id ="rank0";
                  if(k==1)
                  td.id ="rank1";
                  if(k==2)
                  td.id ="rank2";
                }
                break;
                case 2:{
                  td.appendChild(document.createTextNode(JSON.parse(a.responseText).ranking[k].games));
                  if(k==0)
                  td.id ="rank0";
                  if(k==1)
                  td.id ="rank1";
                  if(k==2)
                  td.id ="rank2";
                }
                break;
              }
              tr.appendChild(td);
            }
            tabela.appendChild(tr);
          }
          document.getElementById("tabela_rank").appendChild(tabela);
          document.getElementById("tabela_rank").style.display = "block";
          flag1=1;
        }
      }
    }
  }


function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}
