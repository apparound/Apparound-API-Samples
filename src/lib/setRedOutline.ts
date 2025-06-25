// Utility per aggiungere/rimuovere bordo rosso agli input non validi
export function setRedOutline(el: HTMLElement, enable: boolean) {
   if (enable) {
      el.classList.add('!border-red-500', '!outline-red-500', '!outline-2')
   } else {
      el.classList.remove('!border-red-500', '!outline-red-500', '!outline-2')
   }
}
