import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'

export const getImageOfProduct = async (listOfImageName: Array<String>) => {
   const apparoundData: any = new ApparoundData()
   const promises = listOfImageName.map(imageName => apparoundData.getImageOfProduct(imageName || ''))
   const images = await Promise.all(promises)

   return images
}
