//num only script
function onlyNumberKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}



//polja za unos i resenje
let unos = document.querySelector(".unos");
let resenje = document.querySelector(".resenje");

//dugmici
let dugmad = document.getElementsByName("br");
let znakovi = ["+","-","*","/"];
let brojevi = [".","0","1","2","3","4","5","6","7","8","9"];

//UNDO dugme - brise poslednji znak
const undo = document.querySelector(".undo");
undo.addEventListener("click",function(){
    unos.value=unos.value.slice(0,--unos.value.length);      
})

//DEL DUGME - prazni sve
const del = document.querySelector(".del");
del.addEventListener("click",function(){
    unos.value="";
    resenje.value="";
})

//PROCES UNOSA
dugmad.forEach(dugme => {
    dugme.addEventListener("click", function(){
        
        //BROJEVI
        brojevi.forEach(broj => {
            if(dugme.innerText==broj)
            {
                if(broj==".") //ako je tacka kliknuta
                {
                    if(unos.value=="") //ako je prazno polje
                    {
                        unos.value = "0." //pisemo nulu
                    }
                    else
                    {
                        if(!unos.value.includes(".")) //da li vec ima tacku
                        {
                            unos.value += ".";
                        }
                    }
                    
                }
                else if(broj=="0")//ako je nula kliknuta
                {
                    if(unos.value=="0")//ako je upisana samo nula-pocena cifra
                    {
                        unos.value = "0" //ostaje jedna nula, da izbegnemo dupliranje
                    }
                    else
                    {
                        unos.value += broj; //ako vec ima neki broj, dopisujemo je regularno
                    }
                }
                else
                {
                    if(unos.value == "0")//ako je u unosu samo nula
                    {
                        unos.value = broj; //zamenjujemo je kliknutim brojem
                    }
                    else
                    {
                        unos.value += broj; //ako nije, regularno dopisujemo
                    }
                }
            }
        });

        //ZNAKOVI
        znakovi.forEach(znak => 
        {
            if(dugme.innerText==znak) //da li je pritisnuto dugme jedan od znakova
            {
                if(unos.value!="") //da li je prazan unos
                {
                    //ako nije resenje prazno ili ako nije nula sa nekim znakom
                    if(resenje.value!="")
                    {
                        let v=false;
                        let znakIzResenja="";
                        
                        for (let i = 0; i <= znakovi.length; i++) //loop za proveru znakova u resenju
                        {
                            if(resenje.value.includes(znakovi[i]))
                            {
                                v=true;
                                znakIzResenja=resenje.value.toString().slice(--resenje.value.toString().length);
                            }
                        }

                        if(v==true)  //da li ima neki znak u resenju
                        {
                            if(znak==znakIzResenja)//da li je pritisnuti znak isti kao iz resenja
                            {
                                let a = unos.value.toString();
                                let b = resenje.value.toString().slice(0,--resenje.value.toString().length);
                                let rez = b+znak+a; //pisemo prvo "b" jer se ono sto smo prvo ukucali (unos) se spusta dole (resenje).
                                    
                                console.log(rez);
                                resenje.value = eval(rez);
                                unos.value="";

                                resenje.classList.remove("resenje-small");
                                console.log("isti znakovi");
                            }
                            else // ako nisu isti znaci
                            {
                                resenje.value = unos.value+znak;
                                unos.value="";
                                resenje.classList.add("resenje-small"); //dodavanje male klase u resenju
                                console.log("nisu isti znakovi, samo zamena");               
                            }
                        }
                        else //ako uopste nema znaka u resenju
                        {
                            resenje.value=unos.value+znak;
                            unos.value="";
                            resenje.classList.add("resenje-small");
                            console.log("spustanje iz unosa u resenje jer u njemu nema znaka");
                        }
                    }
                    //ako je resenje prazno a u unosu je broj
                    else
                    {
                        resenje.value=unos.value+znak;
                        unos.value="";
                        resenje.classList.add("resenje-small");
                        console.log("spustanje iz unosa u resenje");
                    }
                }
                //ako je resenje prazno
                else if(resenje.value=="")
                {
                    resenje.value="0"+znak.toString();
                    resenje.classList.add("resenje-small");
                    console.log("prazno resenje");
                }
                //ostaje da je u resenju neki broj
                else
                {  
                    let ima=false;
                    znakovi.forEach(z3 => {
                            if(resenje.value.toString().includes(z3))//pitamo da li je neki znak u resenju 
                            {
                                ima=true; 
                            }
                    });
                    
                    if(ima==true) //da li se verifikator promenio
                    {
                        //skidas prethodni znak a dodajes mu novi
                        resenje.value=resenje.value.toString().slice(0,--resenje.value.toString().length)+znak.toString();
                        console.log("nastavak operacije na postojece resenje sa promenom znaka");
                    }
                    else
                    {
                        //dodajes mu znak posto nema od ranije
                        resenje.value+=znak.toString();
                        resenje.classList.add("resenje-small");
                        console.log("dodavanje znaka na postojece resenje");
                    }
                }
            }
        });

        //ZNAK "="
        if(dugme.innerText=="=")
        {
            if(unos.value=="" && resenje.value=="")
            {
                resenje.value="0";
            }
            else if(unos.value!="" && resenje.value=="")
            {
                resenje.value=unos.value;
                resenje.classList.remove("resenje-small");
                unos.value="";
            }
            else if(unos.value!="" && resenje.value!="")
            {
                let v=false;
                let znakIzResenja="";
                        
                for (let i = 0; i <= znakovi.length; i++) //loop za proveru znakova u resenju
                {
                    if(resenje.value.includes(znakovi[i]))
                    {
                        v=true;
                        znakIzResenja=resenje.value.toString().slice(--resenje.value.toString().length);
                    }
                }

                if(v==true)  //da li ima neki znak u resenju
                {
                    let a = unos.value.toString();
                    let b = resenje.value.toString();
                    let rez = b+a; //pisemo prvo "b" jer se ono sto smo prvo ukucali (unos) se spusta dole (resenje).
                                
                    console.log(rez);
                    resenje.value = eval(rez);
                    unos.value="";

                    resenje.classList.remove("resenje-small");
                    console.log("izvrsena operacija");
                }
            }
        }
    });
});

//POVEZIVANJE TASTATURE SA DUGMADIMA

let buttons=document.querySelectorAll("button"); //Niz sa svim html tagovima buttona 

//Petlja za ispitivanje na pritisak nekog tastera
addEventListener("keydown", function(e)
{
    for (let j = 0; j < buttons.length; j++)
    {
        //karakteri koji nisu jednaki innerTextovima dugmadi ali pokrecu akciju jednog od istih
        
        if (e.key=="Enter") //enter triggeruje "=" dugme
        {
            if (buttons[j].innerText=="=")
            buttons[j].click();
        }
        
        if (e.key=="Delete") //delete triggeruje DEL dugme
        {
            del.click();
        }

        if(e.key=="Backspace") //bakspace triggeruje undo
        {
            undo.click();  //Greska: brise ceo unos umesto jednog karaktera.
        }

        //da li je pritisnuti taster kada se pretvori u string jednak nekom inner textu od dugmadi iz niza buttons
        if (e.key==buttons[j].innerText)
        {
            buttons[j].click();
        }
    }
});