function auto_grow(element) {
  element.style.height = '5px'
  element.style.height = element.scrollHeight + 'px';
}

// show response
async function appendMessageResponse(user, content) {
  const speakerIcon = document.createElement('img');
  speakerIcon.style.imageRendering = 'crisp-edges';
  const responseAreaContainer = document.createElement('div');
  responseAreaContainer.setAttribute('class', 'response-container');
  const responseArea = document.createElement('textarea');
  responseArea.textContent = content;
  responseArea.setAttribute('readonly', '');

  if (user == 'assistant') {
    const historyCtxArea = document.createElement('textarea');
    historyCtxArea.textContent = document.getElementById('context').value;
    historyCtxArea.setAttribute('readonly', '');
    historyCtxArea.style.display = 'none';
    responseArea.appendChild(historyCtxArea);

    speakerIcon.setAttribute('src', 'bot.png');
    responseAreaContainer.appendChild(speakerIcon);
    responseAreaContainer.appendChild(responseArea);
  } else {
    speakerIcon.setAttribute('src', 'usagi.png');
    responseAreaContainer.appendChild(responseArea);
    responseAreaContainer.appendChild(speakerIcon);
  }
  document.getElementById('responses').appendChild(responseAreaContainer);
  auto_grow(responseArea);
}

// Send prompt to the server
// and get response
async function sendPrompt() {
    const prompt = document.getElementById('prompt').value;
    const model = document.getElementById('model').value;
    const context = document.getElementById('context').value;
    if (!prompt || !model || !context) return;

    let contentBody = {
      model: model,
      prompt: prompt,
      stream: false,
    };
    if (context != '[]') {
      contentBody.context = JSON.parse(context);
    }

    appendMessageResponse('user', prompt);
    document.getElementById('prompt').value = '';

    const responseBody = await fetch(window.origin + '/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentBody)
    });

    const messages = await responseBody.json();
    document.getElementById('context').textContent = '[' + messages.context + ']';
    appendMessageResponse('assistant', messages.response);
}

// send promnt by Ctrl+Enter
document.getElementById('prompt').addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'Enter') {
      sendPrompt();
  }
});
