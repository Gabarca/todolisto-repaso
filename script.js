// Usando jQuery
$(document).ready(function() {
    const APIURL = 'http://localhost:8000';

    // Es mejor hacer esto solo una vez, cada $ cuesta tiempo.
    const tBody = $('#tareas > tbody');
    // Objeto para que sea mas bonito
    const detalleTarea = {
        root: $('#detalleTarea'),
        titulo: $('#detalleTarea .titulo'),
        descripcion: $('#detalleTarea .descripcion'),
        boton: $('#detalleTarea .btn')
    };

    cargarTareas();
    function cargarTareas() {
        console.log("Iniciando llamada Ajax");
        $.get( APIURL + '/tareas', function(data, textStatus, jqXHR) {
            data.forEach( function(element) {
                console.log(element);
                appendTarea(element);
            });
        }).fail(handleError);
    }
    
    /** Saca la clase correspondiente a la fila seleccionada, para poder seleccionar otra  */
    function clearActive(){
        tBody.children('.table-secondary').each(function(){
            $(this).toggleClass('table-secondary');
        });
    }

    //  
    tBody.on('click', 'a', function(e){
        clearActive();
        $(this).parents("tr").addClass("table-secondary");
        var id = $(this).attr('data-id');
        // parece que este GET esta de mas y hay que sacarlo de los datos ya cargados
        $.get( APIURL + '/tareas/'+id, function(data, textStatus, jqXHR) { 
            detalleTarea.root.show();
            detalleTarea.titulo.text(data.titulo);
            detalleTarea.descripcion.text(data.descripcion);
            detalleTarea.boton.text('Pasar a estado '+data.nombre_estado + '+1'); //TODO
        }).fail(handleError);
    });
    

    /** Reutilizable al agregar tareas */
    function appendTarea(tarea) { 
        var tRow = '';
        tRow += '<tr>';
        tRow += '<th scope="row">' + tarea.id + '</th>';
        tRow += '<td><a href="#" data-id="' + tarea.id + '">' + tarea.titulo + '</a></td>';
        tRow += '<td>' + tarea.nombre_estado + '</td>';
        tRow += '</tr>';
        tBody.append( $( tRow ) );
    }

    /** Se usa varias veces */
    function handleError(x) {
        console.log("Error en la llamada Ajax :(");
        console.log(x);
    }

    /** Formulario muestra si faltan caracteres al ingresar datos tanto en titulo como en descripcion */

    $("#titulo_error_mensaje").hide();
    $("#descripcion_error_mensaje").hide();
    $("#error_ingreso").hide();
    var error_titulo = false;
    var error_descripcion = false;
	$("#titulo").change(function () {   
        check_titulo();  
	}); 
    $("#descripcion").change(function () {   
        check_descripcion();  
    }); 
    /**funciones check se reutilizan para verificar formulario */
    function check_titulo(){
        var largo_titulo= $("#titulo").val().length; 
        if(largo_titulo<5){
            $("#titulo_error_mensaje").html("El título debe tener largo mayor a 5 caracteres");
            $("#titulo_error_mensaje").show();
            return false;
        }
        else{
            $("#titulo_error_mensaje").hide(); 
            return true;
     }
    }
 
    function check_descripcion(){
        var largo_descripcion= $("#descripcion").val().length; 
        if(largo_descripcion<10){
            $("#descripcion_error_mensaje").html("La descripción debe tener largo mayor a 10 caracteres");
            $("#descripcion_error_mensaje").show();
            return false;
        }
        else{
            $("#descripcion_error_mensaje").hide(); 
            return true;
        }
    };
    

/**Intento de envio de formulario con ajax */

$('#registro_form').submit(function(event){
        event.preventDefault();
        var url= $(this).attr('action');
        var method= $(this).attr('method');
        var data={};
    $(this).find('[name]').each(function(value){
            var name= $(this).attr('name');
            var value= $(this).val();
            data[name]=value;
            data["estado"]="0";
    });
    if (check_descripcion()==false || check_titulo()==false){
        alert("Ingrese los campos solicitados correctamente.");
    }
    data.estado="0";

    
    console.log(data);

    })
    console.log(data);
        return false;


});





