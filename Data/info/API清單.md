LINEbot要串的API資料
一、串天氣 api

1.  目的
    👉 現在天氣、未來預報、舒適度、降雨、溫度、體感、警報、災害（整包）
    👉 給 bot 回「今天天氣怎樣」、「會下雨嗎」、「有沒有颱風」這類問題用的
2.  顯示格式
3.  api 連結
    - 鄉鎮天氣預報-台灣未來 1 週天氣預報
      主要欄位說明：StartTime、EndTime、Longitude、Latitude、LocationName、Temperature、MaxTemperature、MinTemperature、RelativeHumidity、ProbabilityOfPrecipitation、WindDirection、WindSpeed、BeaufortScale、Weather、UVIndex
      更新頻率：每 6 時
      https://data.gov.tw/dataset/9308
      > 鄉鎮天氣預報-台灣未來 1 週天氣預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=rdec-key-123-45678-011121314
    - 鄉鎮天氣預報-台灣未來 3 天天氣預報 API
      主要欄位說明：StartTime、EndTime、Longitude、Latitude、LocationName、Temperature、RelativeHumidity、ProbabilityOfPrecipitation、WindSpeed、ComfortIndex、ComfortIndexDescription、ApparentTemperature、Weather
      更新頻率：每 6 時
      https://data.gov.tw/dataset/9307
      > 鄉鎮天氣預報-台灣未來 3 天天氣預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=rdec-key-123-45678-011121314
    - 鄉鎮天氣預報-臺北市未來 3 天天氣預報
      主要欄位說明：StartTime、EndTime、Longitude、Latitude、LocationName、Temperature、RelativeHumidity、ProbabilityOfPrecipitation、WindSpeed、ComfortIndex、ComfortIndexDescription、ApparentTemperature、Weather
      更新頻率：每 6 時
      https://data.gov.tw/dataset/9293
      > 鄉鎮天氣預報-臺北市未來 3 天天氣預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=rdec-key-123-45678-011121314
    - 天氣特報-各別天氣警特報之內容及所影響之區域
      主要欄位說明：identifier、sender、sent、status、scope、msgType
      更新頻率：不定期更新
      https://data.gov.tw/dataset/9245
      > 天氣特報-各別天氣警特報之內容及所影響之區域 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/W-C0033-002?Authorization=rdec-key-123-45678-011121314
    - 現在天氣觀測報告
      主要欄位說明：StationName、StationId、DateTime、CoordinateName、CoordinateFormat、StationLatitude、StationLongitude、StationAltitude、CountyName、TownName、CountyCode、TownCode、Weather、VisibilityDescription、SunshineDuration、Precipitation、WindDirection、WindSpeed、AirTemperature、RelativeHumidity、AirPressure、UVIndex、PeakGustSpeed
      更新頻率：每 10 分
      https://data.gov.tw/dataset/9178
      > 現在天氣觀測報告 API
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-今明 36 小時天氣預報
      主要欄位說明：locationName(地點)、elementName(預報因子)、startTime(起始時間)、endTime(結束時間)、parameter(預報內容)
      更新頻率：每 6 時
      https://data.gov.tw/dataset/6069
      > 一般天氣預報-今明 36 小時天氣預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314
    - 自動雨量站-雨量觀測資料
      主要欄位說明：StationName、StationId、Maintainer、DateTime、CoordinateName、CoordinateFormat、StationLatitude、StationLongitude、StationAltitude、CountyName、TownName、CountyCode、TownCode、Precipitation
      更新頻率：每 10 分
      https://data.gov.tw/dataset/9177
      > 自動雨量站-雨量觀測資料 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314
    - 健康氣象
      主要欄位說明：Geocode(區域代碼)、Latitude(緯度)、Longitude(經度)、HeatInjuryIndex、HeatInjuryWarning
      更新頻率：每 6 時
      https://data.gov.tw/dataset/143330
      > 健康氣象-熱傷害指數及警示全台各鄉鎮五日逐三小時預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/M-A0085-001?Authorization=rdec-key-123-45678-011121314
      > 健康氣象冷傷害指數及警示全臺各鄉鎮五日預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-A0085-002?Authorization=rdec-key-123-45678-011121314
      > 健康氣象冷傷害指數及警示全臺各鄉鎮未來 72 小時逐 3 小時預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-A0085-003?Authorization=rdec-key-123-45678-011121314
      > 健康氣象-溫差提醒指數及警示全臺各鄉鎮五日預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-A0085-004?Authorization=rdec-key-123-45678-011121314
      > 健康氣象-溫差提醒指數及警示全臺各鄉鎮未來 72 小時逐 3 小時預報 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-A0085-005?Authorization=rdec-key-123-45678-011121314
    - 自動氣象站-氣象觀測資料
      主要欄位說明：StationName、StationId、DateTime、CoordinateName、CoordinateFormat、StationLatitude、StationLongitude、StationAltitude、CountyName、TownName、CountyCode、TownCode、Weather、Precipitation、WindDirection、WindSpeed、AirTemperature、RelativeHumidity、AirPressure、PeakGustSpeed
      更新頻率：每 1 時
      https://data.gov.tw/dataset/9176
      > 自動氣象站-氣象觀測資料 API
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=rdec-key-123-45678-011121314
    - 一般天氣預報-七天天氣預報（台北市+山+景區+澎湖金門馬祖綠島蘭嶼小琉球+北部中部南部東北部東部東南部）
      主要欄位說明：datasetDescription、issueTime、update、locationName、weatherElement
      更新頻率：每6時
      > 一般天氣預報-七天天氣預報
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-003?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-台北市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9221
      > 一般天氣預報-台北市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-009?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-花蓮縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9224
      > 一般天氣預報-花蓮縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-012?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-桃園市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      https://data.gov.tw/dataset/9235
      更新頻率：
      > 一般天氣預報-桃園市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-022?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-新竹市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9240
      > 一般天氣預報-新竹市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-027?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-屏東縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9238
      > 一般天氣預報-屏東縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-025?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-彰化縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9241
      > 一般天氣預報-彰化縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-028?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-雲林縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9242
      > 一般天氣預報-雲林縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-029?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-連江縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9243
      > 一般天氣預報-連江縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-030?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-新北市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9222
      > 一般天氣預報-新北市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-010?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-高雄市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9230
      > 一般天氣預報-高雄市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-017?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-金門縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9226
      > 一般天氣預報-金門縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-014?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-嘉義市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：一般天氣預報-嘉義市天氣小幫手
      https://data.gov.tw/dataset/9232
      > 一般天氣預報-嘉義市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-019?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-苗栗縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9233
      > 一般天氣預報-苗栗縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-020?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-台中市天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9234
      > 一般天氣預報-台中市天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-021?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-新竹縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9236
      > 一般天氣預報-新竹縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-023?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-臺東縣天氣小幫手
      主要欄位說明：locationName、stationId、geocode、parameterSetName(天氣小幫手描述)、parameter
      更新頻率：每12時
      https://data.gov.tw/dataset/9236
      > 一般天氣預報-臺東縣天氣小幫手
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-023?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-今明36小時天氣預報
      主要欄位說明：locationName(地點)、elementName(預報因子)、startTime(起始時間)、endTime(結束時間)、parameter(預報內容)
      更新頻率：每6時
      https://data.gov.tw/dataset/6069
      > 一般天氣預報-今明36小時天氣預報
      > https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314
    - 一般天氣預報-一週縣市天氣預報
      主要欄位說明：datasetDescription、issueTime、update、locationName、weatherElement
      https://data.gov.tw/dataset/9219
      更新頻率：每6時
      > 一般天氣預報-一週縣市天氣預報
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-005?Authorization=rdec-key-123-45678-011121314&format=JSON
    - 一般天氣預報-全球都市天氣預報
      主要欄位說明：locationName、stationId、parameterName、parameterValue、elementName、description、startTime、endTime、value、measure
      更新頻率：每1日
      https://data.gov.tw/dataset/9220
      > 一般天氣預報-全球都市天氣預報
      > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-007?Authorization=rdec-key-123-45678-011121314&format=JSON

二、串紫外線 - 紫外線指數-每日紫外線指數最大值
主要欄位說明：elementName、Date、StationID、UVIndex
更新頻率：每 1 日
https://data.gov.tw/dataset/9039 > 紫外線指數-每日紫外線指數最大值 API > https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=rdec-key-123-45678-011121314

三、串空氣品質

1. 目的
   👉 AQI、PM2.5、預報、即時數據、風速風向、紫外線（能串就串）
   👉 回「今天空氣好嗎」、「可以跑步嗎」、「霧霾多嗎」這種用的
2. 顯示格式
3. api 連結
   - 空氣品質指標(AQI)
     主要欄位說明：測站名稱(sitename)、縣市(county)、空氣品質指標(aqi)、空氣污染指標物(pollutant)、狀態(status)、二氧化硫（ppb）(so2)、一氧化碳（ppm）(co)、臭氧（ppb）(o3)、臭氧 8 小時移動平均（ppb）(o3_8hr)、懸浮微粒（μg/m3）(pm10)、細懸浮微粒（μg/m3）(pm2.5)、二氧化氮（ppb）(no2)、氮氧化物（ppb）(nox)、一氧化氮（ppb）(no)、風速（m/sec）(wind_speed)、風向（degrees）(wind_direc)、資料發布時間(publishtime)、一氧化碳 8 小時移動平均（ppm）(co_8hr)、細懸浮微粒移動平均值（μg/m3）(pm2.5_avg)、懸浮微粒移動平均值（μg/m3）(pm10_avg)、二氧化硫移動平均值（ppb）(so2_avg)、經度(longitude)、緯度(latitude)、測站編號(siteid)
     更新頻率：每 1 時
     https://data.gov.tw/dataset/40448
     > 空氣品質指標(AQI)JSON
     > https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=58d6040c-dca7-407f-a244-d0bfdfa8144a&limit=1000&sort=ImportDate%20desc&format=JSON
   - 空氣品質預報資料
     主要欄位說明：預報文字(content)、發布時間(publishtime)、空品區名稱(area)、主要污染物名稱(majorpollutant)、預報日期(forecastdate)、空氣品質指標預報值(aqi)、次要污染物名稱(minorpollutant)、次要污染物指標預報值(minorpollutantaqi)
     更新頻率：每 30 分
     https://data.gov.tw/dataset/6349
     > 空氣品質預報資料 JSON
     > https://data.moenv.gov.tw/api/v2/aqf_p_01?api_key=540e2ca4-41e1-4186-8497-fdd67024ac44&limit=1000&sort=publishtime%20desc&format=JSON
   - 日空氣品質指標(AQI)
     主要欄位說明：測站編號(siteid)、測站名稱(sitename)、監測日期(monitordate)、空氣品質指標(aqi)、二氧化硫副指標(so2subindex)、一氧化碳副指標(cosubindex)、臭氧副指標(o3subindex)、懸浮微粒副指標(pm10subindex)、二氧化氮副指標(no2subindex)、臭氧 8 小時副指標(o38subindex)、細懸浮微粒副指標(pm25subindex)
     更新頻率：每 1 日
     https://data.gov.tw/dataset/40507
     > 日空氣品質指標(AQI)JSON
     > https://data.moenv.gov.tw/api/v2/aqx_p_434?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=monitordate%20desc&format=JSON
   - 空氣品質監測日最大值
     主要欄位說明：測站代碼(siteid)、測站名稱(sitename)、測項代碼(itemid)、測項名稱(itemname)、測項英文名稱(itemengname)、測項單位(itemunit)、監測日期(monitordate)、數值(concentration)
     更新頻率：每 1 日
     https://data.gov.tw/dataset/91081
     > 空氣品質監測日最大值 JSON
     > https://data.moenv.gov.tw/api/v2/aqx_p_304?api_key=9b651a1b-0732-418e-b4e9-e784417cadef&limit=1000&sort=monitordate%20desc&format=JSON
   - 空氣品質指標(AQI)(歷史資料)
     主要欄位說明：測站名稱(sitename)、縣市(county)、空氣品質指標(aqi)、空氣污染指標物(pollutant)、狀態(status)、二氧化硫[ppb](so2)、一氧化碳[ppm](co)、臭氧[ppb](o3)、臭氧 8 小時移動平均[ppb](o3_8hr)、懸浮微粒[μg/m3](pm10)、細懸浮微粒[μg/m3](pm2.5)、二氧化氮[ppb](no2)、氮氧化物[ppb](nox)、一氧化氮[ppb](no)、風速[m/sec](windspeed)、風向[degrees](winddirec)、資料發布時間(datacreationdate)、單位(unit)、一氧化碳 8 小時移動平均[ppm](co_8hr)、細懸浮微粒移動平均值[μg/m3](pm2.5_avg)、懸浮微粒移動平均值[μg/m3](pm10_avg)、二氧化硫移動平均值[ppb](so2_avg)、經度(longitude)、緯度(latitude)、測站編號(siteid)
     更新頻率：每 1 時
     https://data.gov.tw/dataset/151824
     > 空氣品質指標(AQI)(歷史資料)JSON
     > https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=221974dd-667c-4243-b308-61b60bc29986&limit=1000&sort=datacreationdate%20desc&format=JSON
   - 空氣品質監測月值
     主要欄位說明：測站代碼(siteid)、測站名稱(sitename)、測項代碼(itemid)、測項名稱(itemname)、測項英文名稱(itemengname)、測項單位(itemunit)、監測月份(monitormonth)、監測平均值(concentration)
     更新頻率：每 1 月
     > 空氣品質監測月值 JSON
     > https://data.moenv.gov.tw/api/v2/aqx_p_08?api_key=9e565f9a-84dd-4e79-9097-d403cae1ea75&limit=1000&sort=monitormonth%20desc&format=JSON

四、串氣候報告（暫刪除）

1. 目的
   👉 月報、季報、長期氣候趨勢，適合回答「最近是不是特別熱」、「今年雨多嗎」這類比較抽象的問題
   👉 裝懂用 XD
2. 顯示格式
3. api 連結
   - 長期天氣預報-季長期天氣展望
     主要欄位說明：LocationName、Email
     更新頻率：每 1 月
     https://data.gov.tw/dataset/9193
     > 長期天氣預報-季長期天氣展望 JSON
     > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-A0013-002?Authorization=rdec-key-123-45678-011121314&format=JSON
   - 長期天氣預報-月長期天氣展望
     主要欄位說明：StartTime、EndTime、LocationName、Email
     更新頻率：每 7 日
     https://data.gov.tw/dataset/9192
     > 長期天氣預報-月長期天氣展望 JSON
     > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-A0013-001?Authorization=rdec-key-123-45678-011121314&format=JSON
   - 臺北市氣候
     主要欄位說明：統計期、平均氣溫[0C]、平均相對溼度[%]、日照時數[小時]、降水量[毫米]、降水日數[日]
     更新頻率：每 1 年
     https://data.gov.tw/dataset/136718
     > 臺北市氣候 csv
     > https://tsis.dbas.gov.taipei/statis/webMain.aspx?sys=220&ymf=5700&kind=21&type=0&funid=a05000201&cycle=4&outmode=12&compmode=0&outkind=1&deflst=2&nzo=1

五、串放假日 api

1. 目的
   👉 查「今天要不要上班」、「下次放假什麼時候」、「是不是連假」
   👉 支援 LINE 選單：最近假期／連假用
2. 顯示格式
3. api 連結（待挑選）
   - 政府行政機關辦公日曆表
     主要欄位說明：date(日期)、year(西元年)、name(節日)、isholiday(是否放假)、holidaycategory(周末假期等)、description(備註)
     更新頻率：一年
     https://data.gov.tw/dataset/123662
     > 政府行政機關辦公日曆表 CSV
     > https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/csv/file
   - 天然災害停止上班、停止上課情形
     主要欄位說明：天然災害停止上班、停止上課情形(CAP 格式)
     更新頻率：每一年 RSS
     https://data.gov.tw/dataset/20457
     > 天然災害停止上班、停止上課情形
     > https://alerts.ncdr.nat.gov.tw/RssAtomFeed.ashx?AlertType=33

六、地震

1. 目的
   👉 有感、無感、即時震度、規模、震央 → 地震發生時用來快速反應
   👉 可接「剛剛有地震嗎」、「是哪裡搖」這種直覺問句
2. 顯示格式
3. api 連結
   - 顯著有感地震報告
     主要欄位說明：ResourceDesc、MimeType、ProductURL
     更新頻率：不定期更新
     https://data.gov.tw/dataset/6068
     > 顯著有感地震報告 API
     > https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=rdec-key-123-45678-011121314
     > 縣市行政區觀測震度資料 JSON
     > https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/E-A0015-005?Authorization=rdec-key-123-45678-011121314&downloadType=WEB&format=JSON
   - 小區域有感地震報告
     主要欄位說明：FocalDepth、Location、EpicenterLatitude、EpicenterLongitude、MagnitudeType、MagnitudeValue、CountyName、AreaIntensity、StationName、StationID、InfoStatus、BackAzimuth、EpicenterDistance、EWComponent、NSComponent、VComponent、IntScaleValue、SeismicIntensity、StationLatitude、StationLongitude
     更新頻率：不定期更新
     https://data.gov.tw/dataset/17202
     > 小區域有感地震報告 API
     > https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0016-001?Authorization=rdec-key-123-45678-011121314

七、淺草籤

1. 目的
2. 顯示格式
3. api 連結
   - "C:\ItsNodejs\linebot_dallyChatbot\data\info\AsakusaFortuneTelling.json"

八、語意分析（未定案）

1. 目的
2. 顯示格式
3. api 連結
   - "http://cloud.google.com/natural-language/pricing?hl=zh-tw#pricing_units"
