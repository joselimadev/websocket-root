window.onload = function() {
    
    // Pegando as referências para os elementos da página.
    var form = document.getElementById('mensagem-formulario');
    var mensagemTexto = document.getElementById('mensagem');
    var listaMensagem = document.getElementById('mensagens');
    var socketStatus = document.getElementById('status');
    var btnFechar = document.getElementById('close');
    
    
    // Criando uma nova WebSocket.
    var socket = new WebSocket('ws://echo.websocket.org');
    
    
    // segurando os erros que ocorrerem.
    socket.onerror = function(error) {
      console.log('erros do WebSocket: ' + error);
    };
    
    
    // Mostrando a mensagem de Conectado quando o WebSocket for aberto.
    socket.onopen = function(event) {
      socketStatus.innerHTML = 'Conectado com: ' + event.currentTarget.URL;
      socketStatus.className = 'open';
    };
    
    // Pegando as mensagens enviadas pelo servidor.
    socket.onmessage = function(event) {
      var mensagem = event.data;
      listaMensagem.innerHTML += '<li class="recebida"><span>Recebida:</span>' +
                                 mensagem + '</li>';
    };
    
    //Mostrando a mensagem de desconectado quando o websocket for fechado.
    socket.onclose = function(event) {
      socketStatus.innerHTML = 'Disconectando o WebSocket.';
      socketStatus.className = 'closed';
    };
    
    //Enviando uma mensagem quando o formulário for submetido.
    form.onsubmit = function(e) {
      e.preventDefault();
    
      // Recuperando a mensagem do textarea.
      var mensagem = mensagemTexto.value;
    
      // Enviando a mensagem através do WebSocket.
      socket.send(mensagem);
    
      // Limpando o campo de mensagem.
      mensagemTexto.value = '';
      return false;
    };
    //Fechando a conexão WebSocket quando o botão for clicado.
    btnFechar.onclick = function(e) {
      e.preventDefault();
    
      // Fechando o WebSocket.
      socket.close();
      return false;
    };
  };