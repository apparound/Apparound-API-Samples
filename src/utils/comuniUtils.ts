import comuni from '@/assets/comuni.json'

export function getProvince() {
   return [...new Set(comuni.map((comune: { provincia: { nome: string } }) => comune.provincia.nome))].sort()
}

export function getComuniByProvincia(provincia: string) {
   return provincia
      ? comuni
           .filter((comune: { provincia: { nome: string }; nome: string }) => comune.provincia.nome === provincia)
           .sort((a, b) => a.nome.localeCompare(b.nome))
      : []
}
