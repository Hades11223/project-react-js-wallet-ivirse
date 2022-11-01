import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import { Carousel, Row } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import AssetItem from "../components/AssetItemCard";
import { RelateAssetWrapper } from "./styled";

const RelateAsset = ({
  category,
  userAddress,
  isChangeLike,
  buyerListPostedDataToMarketplace,
  buyer,
}) => {
  const [state, _setState] = useState({
    page: 1,
    size: 4,
    data: null,
    dataList: null,
    arrCarousel: [0, 1, 2],
  });
  const buyerGetPostDataToMarketplace =
    useDispatch()?.datasharing?.buyerGetPostDataToMarketplace;
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const getOtherDataFromBE = async () => {
    let keywords = category?.join(",");
    if (keywords && keywords?.length > 0) {
      let params = {
        keywords,
        userAddress,
      };
      DatahubAssetProvider.search(params)
        .then((res) => {
          console.log(res);
          if (res && res?.data?.code === 200) {
            // setState({ data: res?.data?.data });
            return res?.data?.data;
          }
        })
        .then((res) => {
          setState({ data: res });
        })
        // .then((res) => {
        //   let dataAfterConvert = Promise.all(
        //     res?.map(async (item) => {
        //       let allRequestReceived =
        //         await buyer?.blockchainService?.sharingDataContract?.getListReceivedRequests(
        //           item.owner
        //         );
        //     debugger

        //       return {
        //         ...item,
        //         publicDetail: item,
        //         status: allRequestReceived?.find(
        //           (item2) =>
        //             item2.status === 2 && item.dataCid === item2.dataCid
        //         )
        //           ? "GRANT"
        //           : "CANBUY",
        //       };
        //     })
        //   );
        //   dataAfterConvert
        //   .then((res) => {
        //     console.log("phong adad")
        //     setState({ data: res });

        //   });
        // })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    buyerGetPostDataToMarketplace();
  }, [buyer]);

  useEffect(() => {
    getOtherDataFromBE();
  }, [category, userAddress, isChangeLike]);

  const { scrWidth } = useSelector((state) => state.global);
  const mergeDataFromRequest = (intergration, local) => {
    let mergeData = intergration?.map((item) => ({
      ...item,
      publicDetail: (local?.filter(
        (data) => data?.assetCId === (item?.dataCid || item?.metadataCid)
      ) || [])[0],
    }));
    return mergeData;
  };
  useEffect(() => {
    const resultData = mergeDataFromRequest(
      buyerListPostedDataToMarketplace,
      state?.data
    );
    let cidList = state?.data?.map((item) => item?.assetCId);
    let newData = resultData?.filter((item) =>
      cidList?.includes(item?.dataCid)
    );
    setState({ dataList: newData });
  }, [state.data, buyerListPostedDataToMarketplace]);

  useLayoutEffect(() => {
    const size =
      scrWidth > 992 ? 4 : scrWidth > 768 ? 3 : scrWidth > 576 ? 2 : 2;
    setState({ size });
  }, [scrWidth]);
  return (
    <RelateAssetWrapper>
      {/* <div><h1>{state.data&&state.data[0].description}</h1></div> */}
      {state?.data && (
        <Carousel
          afterChange={(current) => {}}
          arrows={true}
          dots={false}
          prevArrow={
            <button>
              <LeftCircleOutlined />
            </button>
          }
          nextArrow={
            <button>
              <RightCircleOutlined />
            </button>
          }
        >
          {state?.dataList
            ?.map((_, idx) =>
              idx % state.size === 0 ? (
                <div key={idx}>
                  <Row gutter={[16, 16]} className="content-group-5">
                    {state?.dataList
                      ?.slice(idx, idx + state.size)
                      .map((_new, index) =>
                        _new ? (
                            <AssetItem
                              key={index}
                              data={_new}
                              colResponsiveProps={{
                                md: 8,
                                lg: 6,
                                xs: 12,
                                sm: 12,
                              }}
                              handleLiked={AssetLikedProvider.changeLiked}
                            />
                        ) : null
                      )
                      .filter((i) => i)}
                  </Row>
                </div>
              ) : null
            )
            .filter((i) => i)}

          {/* {[0, 1, 2].map((num) => (
            <div className="related-items-container">
              <Row gutter={[16, 16]}>
                {state?.dataList
                  ?.slice(num * state.size, num * state.size + state.size)
                  ?.map((item, index) => {
                    return (
                      <AssetItem
                        key={index}
                        data={item}
                        colResponsiveProps={{
                          md: 8,
                          lg: 6,
                          xs: 12,
                          sm: 12,
                        }}
                        handleLiked={AssetLikedProvider.changeLiked}
                      />
                    );
                  })}
                
              </Row>
            </div>
          ))} */}
        </Carousel>
      )}
    </RelateAssetWrapper>
  );
};

const mapStateToProps = ({
  datasharing: { changeLike, buyerListPostedDataToMarketplace, buyer },
}) => ({
  isChangeLike: changeLike,
  buyerListPostedDataToMarketplace,
  buyer,
});

const mapDispatchToProps = ({}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RelateAsset);
