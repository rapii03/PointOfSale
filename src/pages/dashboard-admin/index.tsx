import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";

export default function Dashboard() {
  const pendapatan: string = "8.340.000";
  const transaksi: number = 331;
  const jumlahProduk: number = 331;
  const jumlahCustomer: number = 332;

  const produk = [
    { produk: "Pocary Sweet", jumlah: 25 },
    { produk: "Indomie Goreng", jumlah: 29 },
    { produk: "Sampurna Mild", jumlah: 54 },
    { produk: "Stella Jeruk", jumlah: 34 },
  ];
  return (
    <div>
      <Head>
        <title>Dashboard Admin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <AdminLayout>
          <p className="text-[#FF6B35] font-bold text-2xl mt-2">Dashboard</p>
          <div className="flex space-x-1 my-2">
            <div className=" flex flex-col space-y-2 ">
              <div className="flex space-x-2 ">
                <div className=" bg-blue-200 flex flex-col space-y-3 p-[20px] rounded-lg ">
                  <div className="flex space-x-1">
                    <div className="relative ">
                      <div className="w-[24.24px] h-[24.24px] bg-[#10b98126]   rounded-full"></div>
                      <svg
                        className="absolute top-1 left-[0.48rem] "
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="14"
                        viewBox="0 0 11 14"
                        fill="none"
                      >
                        <path
                          d="M2.02781 13.4076C2.10286 13.4076 2.16366 13.3468 2.16366 13.2717V7.01285C2.16366 6.93787 2.1028 6.87699 2.02781 6.87699H0.940985C0.866001 6.87699 0.805132 6.93787 0.805132 7.01285V13.2717C0.805132 13.3468 0.865934 13.4076 0.940985 13.4076H2.02781ZM2.02781 13.951H0.940985C0.565823 13.951 0.261719 13.6469 0.261719 13.2717V7.01285C0.261719 6.63778 0.56585 6.33358 0.940985 6.33358H2.02781C2.40295 6.33358 2.70708 6.63778 2.70708 7.01285V13.2717C2.70708 13.6469 2.40297 13.951 2.02781 13.951ZM5.68226 13.4076C5.75731 13.4076 5.81812 13.3468 5.81812 13.2717V5.80905C5.81812 5.73399 5.75731 5.67319 5.68226 5.67319H4.59544C4.5776 5.67319 4.55993 5.6767 4.54345 5.68353C4.52696 5.69035 4.51198 5.70036 4.49937 5.71298C4.48675 5.72559 4.47674 5.74057 4.46992 5.75705C4.46309 5.77354 4.45958 5.7912 4.45958 5.80905V13.2717C4.45958 13.3468 4.52039 13.4076 4.59544 13.4076H5.68226ZM5.68226 13.951H4.59544C4.22028 13.951 3.91617 13.6469 3.91617 13.2717V5.80905C3.91617 5.43388 4.22028 5.12978 4.59544 5.12978H5.68226C6.05743 5.12978 6.36153 5.43388 6.36153 5.80905V13.2717C6.36153 13.6469 6.05743 13.951 5.68226 13.951ZM9.33672 13.4201C9.41177 13.4201 9.47257 13.3593 9.47257 13.2843V4.61764C9.47257 4.54267 9.4117 4.48178 9.33672 4.48178H8.24989C8.17491 4.48178 8.11404 4.54267 8.11404 4.61764V13.2843C8.11404 13.3593 8.17484 13.4201 8.24989 13.4201H9.33672ZM9.33672 13.9635H8.24989C7.87473 13.9635 7.57062 13.6594 7.57062 13.2843V4.61764C7.57062 4.24257 7.87475 3.93837 8.24989 3.93837H9.33672C9.71185 3.93837 10.016 4.24257 10.016 4.61764V13.2843C10.016 13.6594 9.71188 13.9635 9.33672 13.9635ZM7.58895 0.929247L8.94735 0.93129C9.09741 0.931516 9.21924 0.810057 9.21946 0.659995C9.21969 0.509933 9.09823 0.388103 8.94817 0.387877L7.58977 0.385834C7.43971 0.385609 7.31788 0.507067 7.31765 0.657129C7.31742 0.807191 7.43888 0.929021 7.58895 0.929247Z"
                          fill="#10B981"
                        />
                        <path
                          d="M8.67497 0.658611L8.6709 2.00954C8.67045 2.1596 8.79172 2.28162 8.94178 2.28207C9.09185 2.28252 9.21386 2.16125 9.21431 2.01119L9.21839 0.660256C9.21884 0.510194 9.09756 0.388178 8.9475 0.387727C8.79744 0.387276 8.67542 0.508549 8.67497 0.658611Z"
                          fill="#10B981"
                        />
                        <path
                          d="M0.517814 4.60051H2.56336C2.65258 4.60051 2.74093 4.58294 2.82336 4.54879C2.90579 4.51465 2.98068 4.46461 3.04377 4.40152L4.4099 3.03538C4.43538 3.00993 4.4699 2.9956 4.50592 2.99554H6.62536C6.80544 2.99554 6.97815 2.92408 7.10559 2.79685L8.97795 0.924494C9.08406 0.818385 9.08406 0.646353 8.97795 0.540244C8.87185 0.434136 8.69981 0.434136 8.59371 0.540244L6.72152 2.41243C6.69598 2.43787 6.6614 2.45214 6.62536 2.45213H4.50592C4.32578 2.45219 4.15303 2.52376 4.02564 2.65112L2.65951 4.01725C2.64688 4.02989 2.63189 4.03991 2.61539 4.04674C2.59889 4.05358 2.58121 4.0571 2.56335 4.05709H0.5178C0.367738 4.05709 0.246094 4.17874 0.246094 4.3288C0.246094 4.47886 0.367751 4.60051 0.517814 4.60051Z"
                          fill="#10B981"
                        />
                      </svg>
                    </div>

                    <p className="text-[#6D6D6D] font-medium">Pendapatan</p>
                  </div>
                  <p className="font-semibold text-3xl">Rp. {pendapatan}</p>
                </div>
                <div className=" bg-blue-200 flex flex-col space-y-3 p-[20px] rounded-lg w-[247px] ">
                  <div className="flex space-x-1">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <circle
                          cx="12.2851"
                          cy="12.6294"
                          r="12.1229"
                          fill="#0EA5E9"
                          fill-opacity="0.1"
                        />
                        <path
                          d="M15.5872 13.6403C15.9765 13.6403 16.2922 13.956 16.2922 14.3453C16.2922 14.7069 16.02 15.0049 15.6694 15.0456L15.5872 15.0503H7.41973L9.74066 17.3718C9.99481 17.626 10.0144 18.0259 9.79931 18.3024L9.74066 18.3689C9.48652 18.623 9.08663 18.6425 8.81006 18.4275L8.74364 18.3689L5.21865 14.8439C4.79383 14.419 5.06315 13.7058 5.63705 13.6446L5.71716 13.6403H15.5872ZM15.3128 7.44319L15.3793 7.50184L18.9042 11.0268C19.3291 11.4517 19.0597 12.1649 18.4858 12.2261L18.4057 12.2303H8.53574C8.14638 12.2303 7.83074 11.9147 7.83074 11.5253C7.83074 11.1638 8.1029 10.8658 8.45352 10.8251L8.53574 10.8203H16.7032L14.3822 8.49886C14.1281 8.24472 14.1085 7.84482 14.3236 7.56826L14.3822 7.50184C14.6364 7.2477 15.0363 7.22815 15.3128 7.44319Z"
                          fill="#0EA5E9"
                        />
                      </svg>
                    </div>

                    <p className="text-[#6D6D6D] font-medium">Transaksi</p>
                  </div>
                  <p className="font-semibold text-3xl">{transaksi}</p>
                </div>
              </div>
              <div className="flex space-x-2 ">
                <div className=" bg-pink-200 flex flex-col space-y-3 p-[20px] rounded-lg w-[247px] ">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <circle
                          cx="12.58"
                          cy="12.4064"
                          r="12.1229"
                          fill="#F000B9"
                          fill-opacity="0.1"
                        />
                        <path
                          d="M6.27637 8.50615L12.843 11.4247L13.2875 10.4245L6.72085 7.50604L6.27637 8.50615ZM13.6124 18.9504V10.9246H12.518V18.9504H13.6124ZM13.2875 11.4247L19.8541 8.50615L19.4096 7.50604L12.843 10.4245L13.2875 11.4247Z"
                          fill="#F000B9"
                        />
                        <path
                          d="M6.48926 15.7512V8.2943C6.48926 8.1213 6.59114 7.96452 6.74924 7.89426L12.8781 5.17033C12.9913 5.12002 13.1204 5.12002 13.2337 5.17033L19.3625 7.89426C19.5206 7.96452 19.6225 8.1213 19.6225 8.2943V15.7512C19.6225 15.9242 19.5206 16.081 19.3625 16.1512L13.2337 18.8751C13.1204 18.9254 12.9913 18.9254 12.8781 18.8751L6.74924 16.1512C6.59114 16.081 6.48926 15.9242 6.48926 15.7512Z"
                          stroke="#F000B9"
                          stroke-width="0.734374"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.77734 6.55136L16.084 9.35431C16.2421 9.42457 16.3439 9.58135 16.3439 9.75435V12.3883"
                          stroke="#F000B9"
                          stroke-width="0.734374"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[#6D6D6D] font-medium">Produk</p>
                  </div>
                  <p className="font-semibold text-3xl">{jumlahProduk}</p>
                </div>
                <div className=" bg-pink-200 flex flex-col space-y-3 p-[20px] rounded-lg w-[247px]">
                  <div className="flex space-x-1">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <circle
                          cx="12.2851"
                          cy="12.4366"
                          r="12.1229"
                          fill="#FF9800"
                          fill-opacity="0.1"
                        />
                        <path
                          d="M7.33835 11.7577C8.19423 11.7577 8.89008 11.0618 8.89008 10.206C8.89008 9.35007 8.19423 8.65421 7.33835 8.65421C6.48247 8.65421 5.78661 9.35007 5.78661 10.206C5.78661 11.0618 6.48247 11.7577 7.33835 11.7577ZM18.2005 11.7577C19.0564 11.7577 19.7522 11.0618 19.7522 10.206C19.7522 9.35007 19.0564 8.65421 18.2005 8.65421C17.3446 8.65421 16.6488 9.35007 16.6488 10.206C16.6488 11.0618 17.3446 11.7577 18.2005 11.7577ZM18.9764 12.5336H17.4246C16.9979 12.5336 16.6124 12.7057 16.3311 12.9845C17.3083 13.5204 18.0017 14.4878 18.152 15.637H19.7522C20.1814 15.637 20.5281 15.2903 20.5281 14.8612V14.0853C20.5281 13.2294 19.8323 12.5336 18.9764 12.5336ZM12.7694 12.5336C14.2702 12.5336 15.485 11.3188 15.485 9.81802C15.485 8.3172 14.2702 7.10248 12.7694 7.10248C11.2686 7.10248 10.0539 8.3172 10.0539 9.81802C10.0539 11.3188 11.2686 12.5336 12.7694 12.5336ZM14.6315 13.3094H14.4303C13.926 13.5519 13.3659 13.6974 12.7694 13.6974C12.173 13.6974 11.6153 13.5519 11.1086 13.3094H10.9073C9.3653 13.3094 8.11422 14.5605 8.11422 16.1026V16.8008C8.11422 17.4433 8.6355 17.9646 9.27802 17.9646H16.2608C16.9033 17.9646 17.4246 17.4433 17.4246 16.8008V16.1026C17.4246 14.5605 16.1735 13.3094 14.6315 13.3094ZM9.20771 12.9845C8.92645 12.7057 8.54094 12.5336 8.11422 12.5336H6.56248C5.7066 12.5336 5.01074 13.2294 5.01074 14.0853V14.8612C5.01074 15.2903 5.35746 15.637 5.78661 15.637H7.38441C7.53716 14.4878 8.2306 13.5204 9.20771 12.9845Z"
                          fill="#FF9800"
                        />
                      </svg>
                    </div>

                    <p className="text-[#6D6D6D] font-medium">Customer</p>
                  </div>
                  <p className="font-semibold text-3xl">{jumlahCustomer}</p>
                </div>
              </div>
              <div className="bg-red-200 p-[17px] rounded-lg  h-[238px]">
                <p className="font-semibold text-xl my-2">Stock Minimum</p>
                <div className="flex flex-col space-y-2 divide-y divide-blue-200">
                  {produk.map((item, index) => (
                    <div key={index} className="flex justify-between ">
                      <p className="mt-2">{item.produk}</p>
                      <p className="mt-2">{item.jumlah} Pcs</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-purple-200 p-[17px] h-[234px] rounded-lg w-[468px]">
                <p className="font-semibold text-xl my-2">Top Produk</p>
                <div className="flex flex-col space-y-2 divide-y divide-blue-200">
                  {produk.map((item, index) => (
                    <div key={index} className="flex justify-between ">
                      <p className="mt-2">{item.produk}</p>
                      <p className="mt-2">{item.jumlah} Pcs</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-200 p-[17px] mt-2 h-[237px] rounded-lg">
                <p className="font-semibold text-xl mt-2 mb-3">Slow Produk</p>
                <div className="flex flex-col space-y-2 divide-y divide-blue-200">
                  {produk.map((item, index) => (
                    <div key={index} className="flex justify-between ">
                      <p className="mt-2">{item.produk}</p>
                      <p className="mt-2">{item.jumlah} Pcs</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </main>
    </div>
  );
}
