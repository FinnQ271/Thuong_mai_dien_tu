type ThankYouProps = {
  navigate: (page: string) => void
}

function ThankYou({ navigate }: ThankYouProps) {

  const orderInfo = JSON.parse(
    localStorage.getItem("orderInfo") || "{}"
  )

  return (
    <section className="py-5">
      <div className="container text-center mt-5 mb-5">
        <div
          className="bg-white shadow rounded p-5 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="mb-4">
            <i
              className="fa fa-check-circle text-success"
              style={{ fontSize: "80px" }}
            />
          </div>

          <h1 className="fw-bold mb-3">
            Cảm ơn bạn đã đặt hàng 🎉
          </h1>

          <p className="text-muted fs-5 mb-4">
            Cảm ơn <strong>{orderInfo.name}</strong> đã đặt hàng.
            Chúng tôi đã xác nhận email{" "}
            <strong>{orderInfo.email}</strong> của bạn.
            Chúng tôi sẽ liên lạc qua số điện thoại{" "}
            <strong>{orderInfo.phone}</strong> trong thời gian sớm nhất.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => navigate("shop")}
            >
              Tiếp tục mua sắm
            </button>

            <button
              className="btn btn-outline-dark px-4 py-2"
              onClick={() => navigate("home")}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThankYou