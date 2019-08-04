const {
	getInitialData,
    validate
} = require('./getEvents.js');

var actual=new Date();
function mostrarCalendario(year,month) {
	
	var now=new Date(year,month-1,1);
	var last=new Date(year,month,0);
	var primerDiaSemana=(now.getDay()==0)?7:now.getDay();
	var ultimoDiaMes=last.getDate();
	var dia=0;
	var resultado='<tr bgcolor="silver">';
	var diaActual=0;
	console.log(ultimoDiaMes);
 	
	var last_cell=primerDiaSemana+ultimoDiaMes;
 
	// hacemos un bucle hasta 42, que es el máximo de valores que puede
	// haber... 6 columnas de 7 dias
	for(var i=1;i<=42;i++)
	{
		if(i==primerDiaSemana)
		{
			// determinamos en que dia empieza
			dia=1;
		}
		if(i<primerDiaSemana || i>=last_cell)
		{
			// celda vacia
			resultado+="<td>&nbsp;</td>";
		}else{
			// mostramos el dia
			if(dia==actual.getDate() && month==actual.getMonth()+1 && year==actual.getFullYear())
				resultado+='<td data-day="'+ dia +'/' + month +'/' + year +'" class="hoy">'+'<span>'+ dia +'</span>'+'</td>';
			else
				resultado+='<td data-day="'+ dia +'/' + month +'/' + year +'">'+'<span>'+ dia +'</span>'+'</td>';
			dia++;
		}
		if(i%7==0)
		{
			if(dia>ultimoDiaMes)
				break;
			resultado+='</tr><tr>\n';
		}
	}
	resultado+='</tr>';
 
	var meses=Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
 
	// Calculamos el siguiente mes y año
	nextMonth=month+1;
	nextYear=year;
	if(month+1>12)
	{
		nextMonth=1;
		nextYear=year+1;
	}
 
	// Calculamos el anterior mes y año
	prevMonth=month-1;
	prevYear=year;
	if(month-1<1)
	{
		prevMonth=12;
		prevYear=year-1;
	}
 
    let caption = document.getElementsByTagName('caption');
    document.getElementById('calendar').getElementsByTagName('tbody')[0].innerHTML=resultado;
    
    function addCaptionContent(caption) {
        caption.innerHTML='';
        const contprev = document.createElement('div');
        const contnext = document.createElement('div');
        const contdata = document.createElement('div');

        contprev.innerHTML='<a onclick="mostrarCalendario('+prevYear+','+prevMonth+')">&lt;</a>';
        contdata.innerHTML= meses[month-1]+' '+year;
        contnext.innerHTML= '<a onclick="mostrarCalendario('+nextYear+','+nextMonth+')">&gt;</a>';

        caption.appendChild(contprev);
        caption.appendChild(contdata);
        caption.appendChild(contnext);
    }
	addCaptionContent(caption[0]);
	getInitialData(now);
	validate(now)
}
 
mostrarCalendario(actual.getFullYear(),actual.getMonth()+1);