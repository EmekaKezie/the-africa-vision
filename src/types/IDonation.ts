export interface IDonation {
  id: string;
  storyDonationId?: string;
  itemDesc: string;
  itemType: string;
  donationDate: Date;
  itemCount: number;
  benefactorFirstname: string;
  benefactorLastname: string;
  content: string;
  categoryId: string;
  categoryName: string;
}

export interface IDonationActionStore {
  currentPage: number;
  amount: number;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  country: string;
  paymentChannel: string;
}
