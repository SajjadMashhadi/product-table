import { useForm, SubmitHandler } from "react-hook-form";

import { currencyText } from "@/lib/texts";

interface FormInputs {
  quantity: string;
  price: string;
  discount: string;
  currencyType: "USD" | "EUR";
}
import clsx from "clsx";

export default function Form({
  providerName,
  title,
  partNumber,
  currencyType,
  close,
}: {
  providerName: string;
  title: string;
  partNumber: string;
  currencyType: string;
  close: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const formData = {
      title,
      partNumber,
      quantity: data.quantity,
      provider: {
        name: providerName,
        currency: currencyType,
        price: data.price,
        discount: data.discount,
      },
    };
    fetch("https://dummyjson.com/c/f2dc-400e-4fc3-a343", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full border-[1px] border-gray-200 rounded-[20px] p-[20px]">
      <div className="flex flex-row justify-start flex-wrap gap-[50px] text-[14px] my-[20px] ">
        <div>
          <span className="font-bold">تامین کننده: </span>
          <span>{providerName}</span>
        </div>
        <div>
          <span className="font-bold">ثبت کننده قیمت: </span>
          <span>tفاطمه دلیریان</span>
        </div>
        <div>
          <span className="font-bold">عنوان: </span>
          <span>{title}</span>
        </div>
        <div>
          <span className="font-bold">پارت نامبر: </span>
          <span>{partNumber}</span>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row flex-wrap w-full">
          <label className="form-control w-1/3 px-[20px] ">
            <div className="label">
              <span className="label-text-alt">تعداد</span>
            </div>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className={clsx("input input-bordered w-full ", {
                "input-error": errors.quantity,
              })}
            />
            <div className="label h-[30px]">
              {errors.quantity && (
                <span className="label-text-alt text-red-500 leading-[0]">
                  فیلد اجباری
                </span>
              )}
            </div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت واحد</span>
            </div>
            <input
              type="number"
              {...register("price", { required: true })}
              className={clsx("input input-bordered w-full ", {
                "input-error": errors.price,
              })}
            />
            <div className="label h-[30px]">
              {errors.price && (
                <span className="label-text-alt text-red-500 leading-[0]">
                  فیلد اجباری
                </span>
              )}
            </div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت کل</span>
            </div>
            <input
              type="number"
              value={Number(watch("price")) * Number(watch("quantity")) || 0}
              className="input input-bordered w-full "
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">درصد تخفیف</span>
            </div>
            <input
              type="number"
              {...register("discount")}
              className="input input-bordered w-full "
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت واحد نهایی</span>
            </div>
            <input
              type="number"
              value={(
                Number(watch("price")) -
                  (Number(watch("discount")) / 100) * Number(watch("price")) ||
                0
              ).toString()}
              className="input input-bordered w-full "
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت کل نهایی</span>
            </div>
            <input
              type="number"
              value={(
                Number(
                  Number(watch("price")) -
                    (Number(watch("discount")) / 100) * Number(watch("price"))
                ) * Number(watch("quantity")) || 0
              ).toString()}
              className="input input-bordered w-full "
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">دسته بندی</span>
            </div>
            <select className="select select-bordered pr-[40px] ">
              <option selected>محصول</option>
            </select>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">نوع تامین</span>
            </div>
            <select className="select select-bordered pr-[40px] " disabled>
              <option selected>رسمی</option>
            </select>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">نوع ارز</span>
            </div>
            <input
              type="text"
              {...register("currencyType", {
                // @ts-ignore
                value: currencyText[currencyType],
              })}
              className="input input-bordered w-full "
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-2/3 px-[20px]">
            <div className="label">
              <span className="label-text">شرایط پرداخت</span>
            </div>
            <textarea className="textarea textarea-bordered h-24"></textarea>
          </label>
        </div>

        <div className="mt-[20px] flex flex-row gap-[20px] justify-center ">
          <button
            className="btn btn-accent w-[100px] text-white "
            type="submit"
          >
            ثبت
          </button>
          <button
            type="button"
            onClick={() => close()}
            className="btn bg-gray-400 hover:bg-gray-400 w-[100px] text-white"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
